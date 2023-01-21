import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { api } from '../lib/axios';
import { generateDaysFromYearBeginning } from '../utils/generate-days-from-year-beginning';
import HabitDay from './HabitDay';

const weekDays = [
  'Domingo',
  'Segunda',
  'Terça',
  'Quarta',
  'Quinta',
  'Sexta',
  'Sábado',
];
const summaryDates = generateDaysFromYearBeginning();
const minimumSummaryDatesSize = 18 * 7;
const amountOfDaysToFill = minimumSummaryDatesSize - summaryDates.length;

type Summary = {
  id: string;
  date: string;
  amount: number;
  completed: number;
}[];

const SummaryTable = () => {
  const [summary, setSummary] = useState<Summary>([]);

  useEffect(() => {
    api.get('summary').then((res) => {
      setSummary(res.data);
    });
  }, []);

  return (
    <main className='w-full flex'>
      <div className='grid grid-rows-7 grid-flow-row gap-3'>
        {weekDays.map((weekDay) => {
          return (
            <div
              key={weekDay}
              className='text-zinc-400 text-xl h-10 w-10 flex items-center justify-center font-bold'
            >
              {weekDay[0]}
            </div>
          );
        })}
      </div>
      <div className='grid grid-rows-7 grid-flow-col gap-3'>
        {summary.length &&
          summaryDates.map((date) => {
            const dayInSummary = summary.find((day) => {
              return dayjs(date).isSame(day.date, 'day');
            });
            return (
              <HabitDay
                key={date.toString()}
                date={date}
                totalAmount={dayInSummary?.amount}
                defaultCompleted={dayInSummary?.completed}
              />
            );
          })}

        {amountOfDaysToFill > 0 &&
          Array.from({ length: amountOfDaysToFill }).map((item, i) => {
            return (
              <div
                className='w-10 h-10 rounded-lg opacity-40 cursor-not-allowed bg-zinc-900 border-2 border-zinc-800'
                key={i}
              />
            );
          })}
      </div>
    </main>
  );
};

export default SummaryTable;
