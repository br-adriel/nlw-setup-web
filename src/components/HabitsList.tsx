import * as Checkbox from '@radix-ui/react-checkbox';
import dayjs from 'dayjs';
import { Check } from 'phosphor-react';
import { useEffect, useState } from 'react';
import { api } from '../lib/axios';

interface Props {
  date: Date;
  onCompletedChanged: (completed: number) => void;
}

interface HabitsInfo {
  possibleHabits: {
    id: string;
    title: string;
    created_at: string;
  }[];
  completedHabits: string[];
}

const HabitsList = ({ date, onCompletedChanged }: Props) => {
  const [habitsInfo, setHabitsInfo] = useState<HabitsInfo>();
  const isDateInThePast = dayjs(date).endOf('day').isBefore(new Date());

  useEffect(() => {
    api
      .get('day', {
        params: {
          date: date.toISOString(),
        },
      })
      .then((res) => {
        setHabitsInfo(res.data);
      });
  }, []);

  const handleToggleHabit = async (habitId: string) => {
    await api.patch(`habits/${habitId}/toggle`);

    let completedHabits: string[] = [];
    const isCompleted = habitsInfo?.completedHabits.includes(habitId);

    if (isCompleted) {
      completedHabits = habitsInfo!.completedHabits.filter(
        (id) => id !== habitId
      );
    } else {
      completedHabits = [...habitsInfo!.completedHabits, habitId];
    }

    setHabitsInfo((prev) => {
      return {
        possibleHabits: prev ? prev.possibleHabits : [],
        completedHabits,
      };
    });
    onCompletedChanged(completedHabits.length);
  };

  return (
    <div className='mt-6 flex flex-col gap-3'>
      {habitsInfo?.possibleHabits.map((habit) => {
        return (
          <Checkbox.Root
            key={habit.id}
            className='flex items-center gap-3 group  hover:border-violet-300 transition-colors focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:rounded-lg'
            checked={habitsInfo.completedHabits.includes(habit.id)}
            disabled={isDateInThePast}
            onCheckedChange={() => handleToggleHabit(habit.id)}
          >
            <div className='h-8 w-8 rounded-lg flex justify-center items-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500 transition-colors'>
              <Checkbox.Indicator>
                <Check size={20} color='#fff' />
              </Checkbox.Indicator>
            </div>
            <span className='font-semibold text-xl text-white leading-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400 transition-all'>
              {habit.title}
            </span>
          </Checkbox.Root>
        );
      })}
    </div>
  );
};

export default HabitsList;
