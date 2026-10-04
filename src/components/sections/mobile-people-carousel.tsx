"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { PersonProps } from "./people-sections";

type MobilePeopleCarouselProps = {
    people: PersonProps[];
};

export function MobilePeopleCarousel({
    people,
}: MobilePeopleCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const total = people.length;

    if (total === 0) {
        return null;
    }

    const previous = () => {
        setCurrentIndex((current) =>
            current === 0 ? total - 1 : current - 1,
        );
    };

    const next = () => {
        setCurrentIndex((current) =>
            current === total - 1 ? 0 : current + 1,
        );
    };

    const person = people[currentIndex];

    return (
        <div className="sm:hidden">
            {/* Current person */}
            <div className="mx-auto w-full max-w-sm">
                <PersonCardMobile person={person} />
            </div>

            {/* Carousel controls */}
            <div className="mt-6 flex items-center justify-center gap-5">
                <button
                    type="button"
                    onClick={previous}
                    aria-label="Previous person"
                    className="
            inline-flex
            size-10
            items-center
            justify-center
            rounded-full
            border
            border-[#4a2a82]/20
            bg-white
            text-[#4a2a82]
            shadow-sm
            transition-all
            duration-200
            hover:border-[#4a2a82]/40
            hover:bg-[#f7f4fb]
            hover:shadow-md
            focus-visible:outline-2
            focus-visible:outline-offset-2
            focus-visible:outline-[#4a2a82]
          "
                >
                    <ChevronLeft
                        className="size-5"
                        aria-hidden="true"
                    />
                </button>

                <span
                    aria-live="polite"
                    className="
            min-w-[60px]
            text-center
            text-sm
            font-medium
            text-muted-foreground
          "
                >
                    {currentIndex + 1} / {total}
                </span>

                <button
                    type="button"
                    onClick={next}
                    aria-label="Next person"
                    className="
            inline-flex
            size-10
            items-center
            justify-center
            rounded-full
            border
            border-[#4a2a82]/20
            bg-white
            text-[#4a2a82]
            shadow-sm
            transition-all
            duration-200
            hover:border-[#4a2a82]/40
            hover:bg-[#f7f4fb]
            hover:shadow-md
            focus-visible:outline-2
            focus-visible:outline-offset-2
            focus-visible:outline-[#4a2a82]
          "
                >
                    <ChevronRight
                        className="size-5"
                        aria-hidden="true"
                    />
                </button>
            </div>
        </div>
    );
}

/**
 * Mobile-only presentation of a leadership person.
 *
 * Kept inside the client component so no function/component is passed
 * from the server component to the client component.
 */
function PersonCardMobile({
    person,
}: {
    person: PersonProps;
}) {
    const hasName =
        !!person.name && person.name !== "[CLIENT TO PROVIDE]";

    return (
        <article
            className="
        overflow-hidden
        rounded-2xl
        border
        border-[#4a2a82]/15
        bg-white
        shadow-lg
      "
        >
            {/* Photo */}
            <div className="relative aspect-square overflow-hidden bg-[#f7f4fb]">
                {person.photo ? (
                    <img
                        src={person.photo}
                        alt={
                            hasName
                                ? `Portrait of ${person.name}`
                                : ""
                        }
                        className="
              size-full
              object-cover
              transition-transform
              duration-500
            "
                    />
                ) : (
                    <div className="flex size-full items-center justify-center">
                        <div
                            className="
                flex
                size-24
                items-center
                justify-center
                rounded-full
                bg-[#4a2a82]/10
              "
                        >
                            <span
                                className="
                  text-3xl
                  font-semibold
                  text-[#4a2a82]/40
                "
                            >
                                ?
                            </span>
                        </div>
                    </div>
                )}
            </div>

            {/* Information */}
            <div className="px-6 py-6 text-center">
                <h3
                    className="
            font-heading
            text-xl
            font-semibold
            text-[#21164f]
          "
                >
                    {hasName ? (
                        person.name
                    ) : (
                        <span className="text-muted-foreground">
                            Name to be confirmed
                        </span>
                    )}
                </h3>

                <p className="mt-1 text-sm font-medium text-[#4a2a82]">
                    {person.role}
                </p>

                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    {person.bio ??
                        "Biography to be provided by the Foundation."}
                </p>
            </div>
        </article>
    );
}