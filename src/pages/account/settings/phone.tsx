export default function Phone() {
  return (
    <>
      <label
        htmlFor='Tab'
        className='sr-only'>
        Tab
      </label>

      <select
        id='Tab'
        className='w-full rounded-md border-gray-200'>
        <option>Settings</option>
        <option>Messages</option>
        <option>Email</option>
        <option>Notifications</option>
      </select>
    </>
  );
}
