import { useEffect, useState, type HTMLAttributes, type ReactNode } from "react";



type LiquidGlassType = {
    children: ReactNode;
} & HTMLAttributes<HTMLDivElement>;


export const LiquidGlass = ({ children, ...props }: LiquidGlassType) => {
    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);
    return (
        <>
            <div
                style={{
                    transform: `translate(${position.x}px, ${position.y}px)`,
                    filter: 'drop-shadow(-8px -10px 46px #0000005f)',
                    backdropFilter: 'brightness(1.1) blur(2px) url(#displacementFilter)',

                }}

                {...props} >
                {children}
            </div>
            <svg style={{ display: "none" }}>
                <filter id="displacementFilter">
                    <feImage href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAUjSURBVHgBvVZJbhRJFH0/InIuVwlbrUZICDZsfJZes2HXF0FchzNwDbxhhWj1ql3IBlxDZsbv9yMza/KwJEtZMWREvD++H8Djjxy0cjqvqmLvE2vlqUPTAR8+fLCxu76+9m/evMFyuZSbmxt5+RL49g1YLBZq48PW9lrfWlt3ezvM4RIRV3yB+P79+zQnInsJfXCxFKezkEsTAmrnUdnYeakoTc0tZ+Iwo4wzOGGrZ+w3KqnfiJOGclc8to6Kprc3Ytb1WnBNaP9xBhgM7ePHj+7d3++4PRdXlMjLEkWWowpBOIOcYGwlcIXjy42UWySy6TnTKmTLdZ5fXIzqe5W87RFXG8W2haLDaL0B8OrqSnzjUfhSi3ImzewMi6ZBkxeg1iiIUBIoI7AfAZX9jt+25gMcjPsoXdsBv9bIftxJsb6D12RRZ+YNo0ldaAKKPJf52RyL+QXO53M01DT3AYGyBdOSB4cRwJxjABs7hd+2FGJla2jG7ZqzN79oJWjxY4OsExkBsQP0DU1X5Kjnlc6fncl88QyzukYWqJNpxj1ualOQGeDUDt8cx1nXo6d23IZG1pjRKf16BQaiHAJCKkpfeeRNLtWsQt3Y23AjPZesfxzvZqQeyZUUyD5Kmm9pTgNexw3W2yBtK+gpYQjBHQM2XFWIutKJzz18FuApJheOeYN7maXjezRhps4cutwhFilsoVT/++K7HgGCcS/mJFtEh4nf5SecczxLce8ZNTvq29AziDx38CxYTgWV13g9+M7+Xr3iuhlDoaZZSvYz7re9bopI3R96+Ijs52SvvtqpOV+epY0l635L0vDrV/41lMi0MqkYlqbhPa122uDAoSd2ThoihbWWfBlxsdNjQKMmSqJJ38wSbpRScKzh4aEnQz0cuJRDSWD1ERr7Y8CXJEH5byCQ9McNMtLwPbBTDXESOCOgmkld1ETy7M7nN7u0kG/GzH8Ma6Nl8RR+D2DtDn0IOeXO6Bprsyln4o7UDVCN5WlGak6WNe0to8lOKdEeA33q8QNpJnPSRUnH5fBpTAsizmiBnkBkJUl8xdbY+VHASbujCErRPcSCpgBkqbAU0XNc7wiV6t4qawxzEUMoZ6OU9+x62D/lnYO1fshllDHVNWUNWy4vjqmNYGLUL8bK2yEHIadeGg6fqsV98JH/hmg3phESimp2khYjICWjNMwZWXGxi0NaTAed6il6kgujaFNa2Mk0aSzpweIBQKqtasWuZazkZPyML4vokB1yoKWm8jTA6PhlONDmfWjJwyTwvCVrsTzXLP1lPAY8Pz9XrVR612HTbrDarLGKK3IoF3QhEcdEIG7c6EZAP94C3MgbIfQo6zsUDetgsyVdMhKLmDB2gF++fIH+xcKZbXGHFX7KLaxI9NUdC2qYmAqZjHnEn/G8zWej9cL4LXM96op1cH6LcnGHQGBHiz1/vtwDXlxc9H3TY1Nu8DO/RW60RCk325zWcImHbcpauyS50ZGmleV2zrbEwIoFAat8i1m1YjHnWeWalurw6dO/e8DPnz9r13QMzjU2dPTPghefswwdtaNRWGU0VS+VRCIWdOY6K3MyxIZVNaUwzARH7zCha/qwKHivKdfqpZcXL170U3iZiaRqPQPKoYpBm5ZXw+gJwrGaVlTYajTXWrWpmRS8Gorxfb2fs77y4kBtVWr6sqZmlfmUEf9n6NPNZHeLtna6CNPBqfzaRRiPPEbGEz8e9u3h/UXpJhvHy8tLffv2rbF4ugjjdz//A4VxPIgalQVZAAAAAElFTkSuQmCC"
                        preserveAspectRatio="none"
                    />
                    <feTurbulence type="turbulence"
                        baseFrequency={0.01}
                        numOctaves={1}
                        result="turbulence" />

                    <feDisplacementMap in2="turbulence" in="SourceGraphic"
                        scale={200} xChannelSelector="R" yChannelSelector="G" />

                </filter>
            </svg>
        </>
    )
}