// ...props: a spread operator that collects all the remaining props and passes them to the component.
export default function Section({ title, children, ...props }) {
    return (
        <section {...props}>
            <h2>{title}</h2>
            {children}
        </section>
    );
}
