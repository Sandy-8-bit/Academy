import ButtonSm from "../../ui/Common/Button";

export default function CtaSection() {
  return (
    <section
      className="
        w-full 
        bg-blue-900 
        py-10 sm:py-14 
        px-4 sm:px-6 md:px-12 
        rounded-2xl  
        text-white 
        flex flex-col items-center text-center
      "
    >
      {/* Tagline */}
      <span
        className="
          px-3 sm:px-4 
          py-1 
          rounded-full 
          bg-blue-800/50 
          border border-white/20 
          text-blue-100 
          text-xs sm:text-sm 
          mb-3 sm:mb-4
        "
      >
        Your Future in AI Starts Here
      </span>

      {/* Heading */}
      <h2
        className="
          text-2xl sm:text-3xl md:text-4xl 
          font-semibold 
          mb-3 sm:mb-4
        "
      >
        Be a Part of the Future of Intelligence
      </h2>

      {/* Subheading */}
      <p
        className="
          text-sm sm:text-base md:text-lg 
          text-blue-100 
          max-w-xl sm:max-w-2xl 
          mb-8 sm:mb-10
        "
      >
        Join a new generation of AI innovators. Build real-world skills, unlock
        global opportunities, and shape tomorrow’s AI-powered industries.
      </p>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
        <ButtonSm
          state="outline"
          text="Enquiry Now"
          className="
            text-white! 
            border-white! 
            hover:bg-blue-900! 
            hover:text-white! 
            font-medium 
            w-full sm:w-auto
          "
          onClick={() => console.log("Enquiry clicked")}
        />

        <ButtonSm
          state="default"
          text="Start Your Dream Future"
          className="
            bg-white! 
            text-blue-900! 
            border! border-white! 
            hover:bg-white hover:text-blue-900! 
            font-medium 
            w-full sm:w-auto
          "
          onClick={() => console.log("Start clicked")}
        />
      </div>
    </section>
  );
}
