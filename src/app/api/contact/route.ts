
import { NextResponse } from "next/server";
import { validateContact } from "@/lib/validation";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const data: unknown = await request.json();

    if (
      !data ||
      typeof data !== "object" ||
      Array.isArray(data)
    ) {
      return NextResponse.json(
        { ok: false, error: "Invalid form submission." },
        { status: 400 }
      );
    }

    const formData = data as Record<string, unknown>;

    // Basic bot protection: reject a filled honeypot field.
    if (formData.company_website) {
      return NextResponse.json(
        { ok: false, error: "Unable to process this submission." },
        { status: 400 }
      );
    }

    // Ensure required fields are strings before validation.
    const fields = [
      "fullName",
      "contact",
      "enquiryType",
      "message",
    ] as const;

    for (const field of fields) {
      if (typeof formData[field] !== "string") {
        return NextResponse.json(
          {
            ok: false,
            errors: { [field]: "Please enter a valid value." },
            error: "Please check your details.",
          },
          { status: 400 }
        );
      }
    }

    const { errors } = validateContact({
      fullName: formData.fullName as string,
      contact: formData.contact as string,
      enquiryType: formData.enquiryType as string,
      message: formData.message as string,
    });

    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        {
          ok: false,
          errors,
          error: "Please check your details.",
        },
        { status: 400 }
      );
    }

    const businessNumber =
      process.env.WHATSAPP_BUSINESS_NUMBER?.replace(/\D/g, "");

    if (!businessNumber) {
      console.error("WhatsApp business number is not configured.");

      return NextResponse.json(
        {
          ok: false,
          error: "The contact service is not configured yet.",
        },
        { status: 500 }
      );
    }

    const name = (formData.fullName as string).trim();
    const contact = (formData.contact as string).trim();
    const enquiryType = (formData.enquiryType as string).trim();
    const message = (formData.message as string).trim();

    const whatsappMessage = [
      "Hello Jiugypsum, I'd like to discuss a project.",
      "",
      "New enquiry from the website contact form",
      "",
      `Name: ${name}`,
      `Contact: ${contact}`,
      `Enquiry type: ${enquiryType}`,
      "",
      "Message:",
      message,
    ].join("\n");

    const whatsappUrl =
      `https://wa.me/${businessNumber}?text=` +
      encodeURIComponent(whatsappMessage);

    return NextResponse.json({
      ok: true,
      whatsappUrl,
    });
  } catch (error) {
    console.error("Contact API error:", error);

    return NextResponse.json(
      {
        ok: false,
        error: "Something went wrong. Please try again.",
      },
      { status: 500 }
    );
  }
}
