import Column from "@/components/Column";
import Header from "@/components/Header";
import { GRID_LABELS } from "@/constant";
import { authOptions } from "@/utils/next_auth_option";
import { getServerSession } from "next-auth";
import User from "./(models)/user";
import Task from "./(models)/task";
export default async function Home() {
  const session = await getServerSession(authOptions);

  const userTask = await User.aggregate([
    {
      $lookup: {
        from: Task.collection.name,
        localField: "_id",
        foreignField: "createdBy",
        as: "tasks",
      },
    },
  ]);

  return (
    <main className="max-w-[1500px] mx-auto">
      <section>
        <Header />
      </section>
      <div className="task-board bg-white shadow-lg rounded-lg p-8 gap-4">
        {GRID_LABELS.map((item) => {
          return (
            <Column
              key={item.label}
              label={item.label}
              emoji={item.emoji}
              ident={item.ident}
            />
          );
        })}
      </div>
    </main>
  );
}
