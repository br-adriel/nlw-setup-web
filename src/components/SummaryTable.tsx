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

const SummaryTable = () => {
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
        {summaryDates.map((date) => {
          return <HabitDay key={date.toString()} />;
        })}

        {amountOfDaysToFill > 0 &&
          Array.from({ length: amountOfDaysToFill }).map((item, i) => {
            return <HabitDay key={i} disabled />;
          })}
      </div>
    </main>
  );
};

export default SummaryTable;
