const noNotesUI = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16">
      <div className="text-6xl mb-4">🗒️</div>
      <h2 className="text-2xl font-semibold mb-2 text-white">No Notes Yet</h2>
      <p className="text-gray-400 mb-6 max-w-md">
        You don’t have any notes right now. Click the "+ New Note” button to add your first one!
      </p>
    </div>
  )
}
export default noNotesUI;


