"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Project, ProjectCategory } from "@/data/projects";
import { track } from "@/lib/analytics";
import { QUOTE_HREF } from "@/lib/site";
import { services } from "@/data/services";
import { ArrowRight, Chevron, Close } from "./icons";

const ALL = "All";

export default function GalleryView({ projects, categories }: { projects: Project[]; categories: ProjectCategory[] }) {
  const params = useSearchParams();
  const initialCategory = params.get("category");
  const initialProject = params.get("project");

  const [filter, setFilter] = useState<string>(initialCategory && categories.includes(initialCategory as ProjectCategory) ? initialCategory : ALL);
  const [openSlug, setOpenSlug] = useState<string | null>(initialProject && projects.some((p) => p.slug === initialProject) ? initialProject : null);

  const visible = useMemo(() => (filter === ALL ? projects : projects.filter((p) => p.category === filter)), [filter, projects]);
  const counts = useMemo(() => Object.fromEntries(categories.map((c) => [c, projects.filter((p) => p.category === c).length])), [categories, projects]);

  const openIndex = openSlug ? visible.findIndex((p) => p.slug === openSlug) : -1;
  const current = openIndex >= 0 ? visible[openIndex] : null;

  // If the filter changes while a project is open and it falls out of the list, close it.
  useEffect(() => {
    if (openSlug && openIndex < 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- keep dialog state consistent with the filter
      setOpenSlug(null);
    }
  }, [openSlug, openIndex]);

  const triggerRef = useRef<HTMLElement | null>(null);
  const open = (p: Project, el: HTMLElement | null) => {
    triggerRef.current = el;
    setOpenSlug(p.slug);
    track("gallery_project_view", { project: p.slug, category: p.category });
  };
  const close = useCallback(() => {
    setOpenSlug(null);
    triggerRef.current?.focus?.();
  }, []);
  const step = useCallback(
    (dir: 1 | -1) => {
      if (openIndex < 0 || visible.length < 2) return;
      const next = visible[(openIndex + dir + visible.length) % visible.length];
      setOpenSlug(next.slug);
      track("gallery_project_view", { project: next.slug, category: next.category });
    },
    [openIndex, visible],
  );

  return (
    <>
      <div className="filters" role="group" aria-label="Filter projects by type">
        {[ALL, ...categories].map((c) => (
          <button key={c} type="button" className="filter" aria-pressed={filter === c} onClick={() => setFilter(c)}>
            {c}
            <small>{c === ALL ? projects.length : counts[c]}</small>
          </button>
        ))}
      </div>

      <p className="sr-only" role="status" aria-live="polite">
        Showing {visible.length} {visible.length === 1 ? "project" : "projects"}
        {filter !== ALL ? ` in ${filter}` : ""}
      </p>

      {visible.length === 0 ? (
        <p className="empty">No projects in this category yet. Check back soon.</p>
      ) : (
        <ul className="grid-gallery" key={filter}>
          {visible.map((p, i) => (
            <li key={p.slug}>
              <button type="button" className="tile zoom" style={{ "--i": i } as React.CSSProperties} onClick={(e) => open(p, e.currentTarget)} aria-haspopup="dialog">
                <div className="frame">
                  <Image src={p.image.src} alt={p.image.alt} fill sizes="(min-width: 900px) 33vw, (min-width: 480px) 50vw, 100vw" loading={i < 3 ? "eager" : "lazy"} />
                  {p.stage === "In progress" && <span className="chip chip--stage glass">In progress</span>}
                </div>
                <div className="tile__cap">
                  <small>{p.category}</small>
                  <h3>{p.title}</h3>
                </div>
              </button>
            </li>
          ))}
        </ul>
      )}

      <Lightbox project={current} index={openIndex} total={visible.length} onClose={close} onStep={step} />
    </>
  );
}

function Lightbox({ project, index, total, onClose, onStep }: { project: Project | null; index: number; total: number; onClose: () => void; onStep: (d: 1 | -1) => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const touchX = useRef<number | null>(null);

  // Native <dialog> gives us the focus trap, Esc handling and inert background for free.
  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (project && !d.open) d.showModal();
    if (!project && d.open) d.close();
  }, [project]);

  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") onStep(1);
      if (e.key === "ArrowLeft") onStep(-1);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [project, onStep]);

  const serviceFor = project ? services.find((s) => s.galleryCategory === project.category)?.name : undefined;
  const quoteHref = serviceFor ? `${QUOTE_HREF}?service=${encodeURIComponent(serviceFor)}` : QUOTE_HREF;

  return (
    <dialog
      ref={ref}
      className="lightbox"
      aria-label={project ? `${project.title}, project ${index + 1} of ${total}` : "Project viewer"}
      onClose={onClose}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {project && (
        <div
          className="lb"
          onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            touchX.current = null;
            if (Math.abs(dx) > 50) onStep(dx < 0 ? 1 : -1);
          }}
        >
          <div className="lb__stage" onClick={(e) => e.target === e.currentTarget && onClose()}>
            {/* eslint-disable-next-line @next/next/no-img-element -- full-bleed lightbox image sized by CSS; already optimised WebP */}
            <img key={project.slug} src={project.image.src} alt={project.image.alt} width={project.image.width} height={project.image.height} />
            {total > 1 && (
              <>
                <button type="button" className="lb__btn lb__prev glass-dark" onClick={() => onStep(-1)} aria-label="Previous project">
                  <Chevron dir="left" />
                </button>
                <button type="button" className="lb__btn lb__next glass-dark" onClick={() => onStep(1)} aria-label="Next project">
                  <Chevron dir="right" />
                </button>
              </>
            )}
          </div>
          <div className="lb__panel glass-dark">
            <p className="lb__count" aria-hidden>
              {index + 1} / {total}
            </p>
            <small>
              {project.category}
              {project.stage ? ` · ${project.stage}` : ""}
            </small>
            <h2>{project.title}</h2>
            <p>{project.description}</p>
            {project.location && <p>Location: {project.location}</p>}
            <Link href={quoteHref} className="btn btn--primary btn--block" onClick={() => track("quote_cta_click", { location: "gallery_lightbox", project: project.slug })}>
              Get a Free Quote <ArrowRight />
            </Link>
          </div>
        </div>
      )}
      <button type="button" className="lb__btn lb__close glass-dark" onClick={onClose} aria-label="Close viewer">
        <Close />
      </button>
    </dialog>
  );
}
