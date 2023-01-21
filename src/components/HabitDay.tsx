import * as Popover from '@radix-ui/react-popover';
import clsx from 'clsx';
import dayjs from 'dayjs';
import { useState } from 'react';
import HabitsList from './HabitsList';
import ProgressBar from './ProgressBar';

interface HabitProps {
  date: Date;
  defaultCompleted?: number;
  totalAmount?: number;
}

const HabitDay = (props: HabitProps) => {
  const { defaultCompleted = 0, totalAmount = 0, date } = props;

  const [completed, setCompleted] = useState(defaultCompleted);

  const percentage =
    totalAmount > 0 ? Math.round((completed / totalAmount) * 100) : 0;

  const dayAndMonth = dayjs(date).format('DD/MM');
  const dayOfWeek = dayjs(date).format('dddd');

  const styleClasses = clsx(
    `w-10 h-10 rounded-lg transition-colors  hover:border-violet-300 transition-colors focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-background`,
    {
      'bg-zinc-900 border-2 border-zinc-800': percentage === 0,
      'bg-violet-900 border-violet-800': percentage > 0 && percentage < 20,
      'bg-violet-800 border-violet-700': percentage >= 20 && percentage < 40,
      'bg-violet-700 border-violet-600': percentage >= 40 && percentage < 60,
      'bg-violet-600 border-violet-500': percentage >= 60 && percentage < 80,
      'bg-violet-500 border-violet-400': percentage >= 80,
    }
  );

  const handleCompletedChanged = (completed: number) => {
    setCompleted(completed);
  };

  return (
    <Popover.Root>
      <Popover.Trigger className={styleClasses} />
      <Popover.Portal>
        <Popover.Content className='min-w-[320px] p-6 rounded-2xl bg-zinc-900 flex flex-col  hover:border-violet-300 transition-colors focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-background'>
          <span className='font-semibold text-zinc-400'>{dayOfWeek}</span>
          <span className='mt-1 font-extrabold leading-tight text-3xl'>
            {dayAndMonth}
          </span>

          <ProgressBar progress={percentage} />

          <HabitsList date={date} onCompletedChanged={handleCompletedChanged} />

          <Popover.Arrow className='fill-zinc-900' height={8} width={16} />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default HabitDay;
