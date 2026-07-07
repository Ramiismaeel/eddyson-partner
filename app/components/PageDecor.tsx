
export default function PageDecor() {
    const year = new Date().getFullYear();
  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 -z-10
          h-[380px] w-[420px]
          bg-[radial-gradient(rgba(148,148,148,0.35)_1.3px,transparent_1.3px)]
          bg-[size:22px_22px]
          [mask-image:radial-gradient(circle_at_85%_15%,#000_0%,transparent_72%)]
          [-webkit-mask-image:radial-gradient(circle_at_85%_15%,#000_0%,transparent_72%)]"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-6 top-24 hidden md:block
          whitespace-nowrap font-mono text-xs font-light uppercase
          tracking-[0.24px] text-neutral-400
          [writing-mode:vertical-rl] rotate-180"
      >
        eddyson&nbsp;|&nbsp;{year}
      </span>
    </>
  );
}