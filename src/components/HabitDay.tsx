interface HabitProps {
  completed?: number;
  disabled?: boolean;
}

const HabitDay = ({ completed, disabled = false }: HabitProps) => {
  return (
    <div
      className={`w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg ${
        disabled && 'opacity-40 cursor-not-allowed'
      }`}
    />
  );
};

export default HabitDay;
