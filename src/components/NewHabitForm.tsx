import * as Checkbox from '@radix-ui/react-checkbox';
import { Check } from 'phosphor-react';
import { FormEvent, useState } from 'react';
import { api } from '../lib/axios';

const availableWeekDays = [
  'Domingo',
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Sexta-feira',
  'Sábado',
];

const NewHabitForm = () => {
  const [title, setTitle] = useState('');
  const [weekDays, setWeekdays] = useState<number[]>([]);

  const handleToggleWeekday = (weekday: number) => {
    if (weekDays.includes(weekday)) {
      setWeekdays((prev) => prev.filter((wd) => wd !== weekday));
    } else {
      setWeekdays((prev) => [...prev, weekday]);
    }
  };

  const createNewHabit = async (e: FormEvent) => {
    e.preventDefault();

    if (!title || !weekDays.length) return;

    await api.post('habits', {
      title,
      weekDays,
    });
    setTitle('');
    setWeekdays([]);
    alert('Hábito adicionado!');
  };
  return (
    <form
      onSubmit={(e) => createNewHabit(e)}
      className='w-full flex flex-col mt-6 '
    >
      <label htmlFor='title' className='font-semibold leading-tight'>
        Qual o nome do hábito?
      </label>
      <input
        type='text'
        id='title'
        name='title'
        placeholder='Beber 2L de água, me exercitar...'
        autoFocus
        className='p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:rounded-lg'
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />

      <label htmlFor='recurrency' className='font-semibold leading-tight mt-4'>
        Qual a recorrência?
      </label>

      <div className='mt-3 flex flex-col gap-2'>
        {availableWeekDays.map((wd, i) => {
          return (
            <Checkbox.Root
              key={wd}
              className='flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:rounded-lg'
              onCheckedChange={() => handleToggleWeekday(i)}
              value={i}
              name='weekday'
              checked={weekDays.includes(i)}
            >
              <div className='h-8 w-8 rounded-lg flex justify-center items-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500 transition-colors'>
                <Checkbox.Indicator>
                  <Check size={20} color='#fff' />
                </Checkbox.Indicator>
              </div>
              <span className='text-white leading-tight'>{wd}</span>
            </Checkbox.Root>
          );
        })}
      </div>

      <button
        type='submit'
        className='mt-6 rounded-lg p-4 flex items-center justify-center font-semibold gap-3 bg-green-600 hover:bg-green-500 transition-colors focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:rounded-lg'
      >
        <Check size={20} weight='bold' />
        Confirmar
      </button>
    </form>
  );
};

export default NewHabitForm;
