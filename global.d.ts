interface Window {
    $: any;
    jQuery: any;
}

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'pretalx-schedule': any;
        }
    }
}