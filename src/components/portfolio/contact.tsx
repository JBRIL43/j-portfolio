"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { ArrowUpRight, Github, Linkedin, Mail, Send } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { socials } from "@/lib/portfolio-data";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";
import { AmbientGlow } from "./ambient-glow";
import { MangaPanel } from "./manga-panel";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const schema = z.object({
  name: z.string().min(2, "Please enter your name (2+ characters).").max(80),
  email: z.email("Please enter a valid email address."),
  subject: z.string().min(2, "Add a short subject.").max(120),
  message: z
    .string()
    .min(10, "Tell me a bit more (10+ characters).")
    .max(2000),
});

type FormValues = z.infer<typeof schema>;

const socialLinks = [
  {
    label: "LinkedIn",
    handle: "/in/jibril-nuredin",
    href: socials.linkedin,
    icon: Linkedin,
  },
  {
    label: "GitHub",
    handle: "@JBRIL43",
    href: socials.github,
    icon: Github,
  },
  {
    label: "Email",
    handle: "jibrilnur32@gmail.com",
    href: socials.email,
    icon: Mail,
  },
];

function SocialCard({ item }: { item: (typeof socialLinks)[number] }) {
  const Icon = item.icon;
  return (
    <MangaPanel index={item.label} left={false} className="group p-5">
      <motion.a
        href={item.href}
        target={item.label === "Email" ? undefined : "_blank"}
        rel="noopener noreferrer"
        className="relative flex items-center gap-4"
      >
        <div className="relative grid size-11 shrink-0 place-items-center rounded-xl bg-black/[0.06] ring-1 ring-black/10 transition-colors group-hover:bg-[#059669]/15">
          <Icon className="size-5 text-[#047857]" />
        </div>
        <div className="relative min-w-0 flex-1">
          <p className="text-sm font-medium text-foreground">{item.label}</p>
          <p className="truncate text-xs text-muted-foreground">{item.handle}</p>
        </div>
        <ArrowUpRight className="relative size-4 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#047857]" />
      </motion.a>
    </MangaPanel>
  );
}

export function Contact() {
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", subject: "", message: "" },
  });

  const onSubmit = async (values: FormValues) => {
    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        message?: string;
        error?: string;
        issues?: { fieldErrors?: Record<string, string[]> };
      };

      if (res.ok && data.ok) {
        toast.success(data.message ?? "Message sent. Talk soon!");
        reset();
      } else {
        toast.error(data.error ?? "Something went wrong. Please try again.");
      }
    } catch {
      toast.error("Network error. Please check your connection and retry.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative overflow-hidden py-24 sm:py-32">
      <AmbientGlow color="bg-[#059669]/10" top="top-0" blur="blur-[130px]" />

      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          eyebrow="Contact"
          title={
            <>
              Let's build something{" "}
              <span className="text-gradient-blue">meaningful</span>
            </>
          }
          description="Have a project, a community idea, or just want to connect? My inbox is always open."
        />

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_0.85fr]">
          <Reveal>
            <MangaPanel index={0} left={true} className="p-6 sm:p-8">
              <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                className="space-y-5"
              >
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      placeholder="Your name"
                      autoComplete="name"
                      aria-invalid={!!errors.name}
                      {...register("name")}
                    />
                    {errors.name && (
                      <p className="text-xs text-destructive">
                        {errors.name.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      autoComplete="email"
                      aria-invalid={!!errors.email}
                      {...register("email")}
                    />
                    {errors.email && (
                      <p className="text-xs text-destructive">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    placeholder="What's this about?"
                    aria-invalid={!!errors.subject}
                    {...register("subject")}
                  />
                  {errors.subject && (
                    <p className="text-xs text-destructive">
                      {errors.subject.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    rows={5}
                    placeholder="Tell me about your idea, project, or opportunity..."
                    aria-invalid={!!errors.message}
                    {...register("message")}
                  />
                  {errors.message && (
                    <p className="text-xs text-destructive">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className={cn(
                    "group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#111] px-5 py-3 text-sm font-medium text-white  transition-all hover:bg-[#059669] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                  )}
                >
                  {submitting ? (
                    <>
                      <span className="size-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="size-4 transition-transform group-hover:translate-x-0.5" />
                    </>
                  )}
                </button>
              </form>
            </MangaPanel>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex h-full flex-col gap-3">
              {socialLinks.map((s) => (
                <SocialCard key={s.label} item={s} />
              ))}

              <MangaPanel index={0} left={true} className="mt-auto p-5">
                <div className="flex items-center gap-2">
                  <span className="relative flex size-2">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400/70" />
                    <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
                  </span>
                  <p className="text-sm font-medium text-foreground">
                    Currently available
                  </p>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  Open to freelance web work, design collaborations, community
                  partnerships, and meaningful conversations.
                </p>
              </MangaPanel>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}