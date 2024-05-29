import MultiselectForm from "./MultiselectForm";

export default function FieldBuilder() {
  return (
    <div className="bg-white dark:bg-slate-800 max-w-screen-md rounded border border-blue-200 dark:border-slate-600 flex flex-col w-full shadow">
      <div className="px-8 py-4 bg-blue-200 dark:bg-slate-900  text-blue-600 dark:text-slate-100  font-bold">
        Field Builder
      </div>
      <section className="px-12 py-8">
        <MultiselectForm />
      </section>
    </div>
  );
}
