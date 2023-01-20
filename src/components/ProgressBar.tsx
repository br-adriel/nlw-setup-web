interface ProgressBarProps {
  progress: number;
}

const ProgressBar = ({ progress }: ProgressBarProps) => {
  return (
    <div className='h-3 rounded-xl bg-zinc-700 w-full mt-4'>
      <div
        style={{ width: `${progress}%` }}
        className='h-3 rounded-xl bg-violet-600'
        role='progressbar'
        aria-label='Progresso de hábitos completados no dia'
        aria-valuenow={progress}
      />
    </div>
  );
};

export default ProgressBar;
