import type { ReactNode } from "react";


interface ContainerGAGProps {
    variants?: "external" | "internal" | "glass",
    className?: string,
    children: ReactNode
}


function ContainerGAG({ variants = "external", className, children }: ContainerGAGProps) {
    const containerStyleVariants = {
        external: "bg-[#3D1A0A]",
        internal: "bg-[#714227]",
        glass: "bg-[#714227]/50 "
    }



    return (
        <div className={`p-4 box-border border-2 size-max border-black/35 ${containerStyleVariants[variants]} ${className}`}>
            {children}
        </div>
    )
}




export default ContainerGAG;
