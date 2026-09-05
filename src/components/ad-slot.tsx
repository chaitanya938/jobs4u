type AdSlotProps = {
    label?: string;
    compact?: boolean;
    className?: string;
};

function AdSlot(_props: AdSlotProps) {
    return null;
}

export function AdSlotTop(props: AdSlotProps) {
    return <AdSlot {...props} />;
}

export function AdSlotInContent(props: AdSlotProps) {
    return <AdSlot {...props} compact />;
}

export function AdSlotBetweenJobs(props: AdSlotProps) {
    return <AdSlot {...props} compact />;
}

export function AdSlotSidebar(props: AdSlotProps) {
    return <AdSlot {...props} compact />;
}

export function AdSlotBeforeRelated(props: AdSlotProps) {
    return <AdSlot {...props} compact />;
}

export function AdSlotBottom(props: AdSlotProps) {
    return <AdSlot {...props} />;
}

export function AdSlotStickyMobile(props: AdSlotProps) {
    return <AdSlot {...props} compact className="sticky bottom-4 z-30 shadow-xl md:hidden" />;
}
