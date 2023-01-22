import { prisma } from "./lib/prisma";
import { z } from "zod";
import { FastifyInstance } from "fastify";
import dayjs from "dayjs";

export async function appRoute(app: FastifyInstance) {
  app.post("/habits", async (request) => {
    const createHabitBody = z.object({
      title: z.string(),
      weekDays: z.array(z.number().min(0).max(6)),
    });

    // [0, 1, 2] = Domingo, Segunda, Terça
    const { title, weekDays } = createHabitBody.parse(request.body);

    //"day" zera as horas, minutos e segundos
    const today = dayjs().startOf("day").toDate();

    await prisma.habit.create({
      data: {
        title,
        created_at: today,
        weekDays: {
          create: weekDays.map((weekDays) => {
            return {
              week_day: weekDays,
            };
          }),
        },
      },
    });
  });

  app.get("/day", async (resquest) => {
    const getDayParams = z.object({
      //converte string em date
      date: z.coerce.date(),
    });

    const { date } = getDayParams.parse(resquest.query);
    //localhost:3333/day?date=2023-01-20 -> query

    const parsedDate = dayjs(date).startOf("day");
    const weekDay = parsedDate.get("day");

    //Duas info: todos os hábitos possíveis e todos completados naquele dia
    const possibleHabits = await prisma.habit.findMany({
      where: {
        created_at: {
          lte: date,
        },
        weekDays: {
          some: {
            week_day: weekDay,
          },
        },
      },
    });

    const day = await prisma.day.findUnique({
      where: {
        date: parsedDate.toDate(),
      },
      include: {
        dayHabits: true,
      },
    });

    const completedHabits = day?.dayHabits.map((dayHabits) => {
      return dayHabits.habit_id;
    });

    return {
      possibleHabits,
      completedHabits,
    };
  });
}
