import * as Checkbox from '@radix-ui/react-checkbox';
import * as Popover from '@radix-ui/react-popover';
import clsx from 'clsx';
import dayjs from 'dayjs';
import { Check } from 'phosphor-react';
import ProgressBar from './ProgressBar';

interface HabitProps {
  date: Date;
  completed?: number;
  totalAmount?: number;
}

const HabitDay = ({ completed = 0, totalAmount = 0, date }: HabitProps) => {
  const percentage =
    totalAmount > 0 ? Math.round((completed / totalAmount) * 100) : 0;

  const dayAndMonth = dayjs(date).format('DD/MM');
  const dayOfWeek = dayjs(date).format('dddd');

  const styleClasses = clsx(`w-10 h-10 rounded-lg`, {
    'bg-zinc-900 border-2 border-zinc-800': percentage === 0,
    'bg-violet-900 border-violet-800': percentage > 0 && percentage < 20,
    'bg-violet-800 border-violet-700': percentage >= 20 && percentage < 40,
    'bg-violet-700 border-violet-600': percentage >= 40 && percentage < 60,
    'bg-violet-600 border-violet-500': percentage >= 60 && percentage < 80,
    'bg-violet-500 border-violet-400': percentage >= 80,
  });

  return (
    <Popover.Root>
      <Popover.Trigger className={styleClasses} />
      <Popover.Portal>
        <Popover.Content className='min-w-[320px] p-6 rounded-2xl bg-zinc-900 flex flex-col'>
          <span className='font-semibold text-zinc-400'>{dayOfWeek}</span>
          <span className='mt-1 font-extrabold leading-tight text-3xl'>
            {dayAndMonth}
          </span>

          <ProgressBar progress={percentage} />

          <div className='mt-6 flex flex-col gap-3'>
            <Checkbox.Root className='flex items-center gap-3 group'>
              <div className='h-8 w-8 rounded-lg flex justify-center items-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500'>
                <Checkbox.Indicator>
                  <Check size={20} color='#fff' />
                </Checkbox.Indicator>
              </div>
              <span className='font-semibold text-xl text-white leading-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400'>
                Beber água
              </span>
            </Checkbox.Root>
          </div>

          <Popover.Arrow className='fill-zinc-900' height={8} width={16} />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default HabitDay;
