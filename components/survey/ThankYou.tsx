"use client";

export default function ThankYou() {
  const meetupUrl = process.env.NEXT_PUBLIC_MEETUP_GROUP_URL;

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1A1714] px-4">
      <div className="text-center max-w-md">
        <h1 className="text-5xl font-extrabold text-[#E8A838] tracking-widest uppercase mb-4">
          Vibe MKE
        </h1>
        <div className="w-16 h-1 bg-gradient-to-r from-[#C4613A] to-[#E8A838] mx-auto mb-8 rounded-full" />
        <h2 className="text-2xl font-bold text-[#F5EDE0] mb-3">
          Thanks for your feedback!
        </h2>
        <p className="text-[#F5EDE0CC] mb-2">
          See you at the next Vibe MKE.
        </p>
        <p className="text-[#F5EDE099] text-sm mb-8">
          Your responses help us build a better community.
        </p>
        {meetupUrl && (
          <a
            href={meetupUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#E8A838] text-[#1A1714] px-6 py-3 rounded-lg font-bold uppercase tracking-wider hover:bg-[#d49a30] transition-colors"
          >
            Join us on Meetup.com
          </a>
        )}
      </div>
    </div>
  );
}
