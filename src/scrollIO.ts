export default function scrollIO(root: HTMLElement | null) {
    if (!root) return;
    const observables: HTMLElement | HTMLElement[] | null =
        // root && [...root.children].map(e => e as HTMLElement);
        [...root.querySelectorAll<HTMLElement>("[class*='__post']")];

    if (!observables) return;

    const cb: IntersectionObserverCallback = e => {
        console.log(e.map(i => (i.target as HTMLElement).dataset.post));
        e.forEach(post => {
            post.target.setAttribute('io', post.isIntersecting + '');
            if (post.isIntersecting) post.target.classList.add('current');
            else post.target.classList.remove('current');
        });
    };
    const IO = new IntersectionObserver(cb, {
        root,
        threshold: [0.95],
        rootMargin: '-20% 0%',
    });
    observables.forEach(e => IO.observe(e));
}
