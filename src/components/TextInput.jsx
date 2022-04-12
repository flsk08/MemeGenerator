export default function TextInput({ userInput, setUserInput }) {
  return (
    <>
      <form>
        <input
          value={userInput.top}
          onChange={(e) => setUserInput({ ...userInput, top: e.target.value })}
          type="text"
          placeholder="Top Text"
        />
        <input
          value={userInput.bottom}
          onChange={(e) =>
            setUserInput({ ...userInput, bottom: e.target.value })
          }
          type="text"
          placeholder="Bottom Text"
        />
      </form>
    </>
  );
}
