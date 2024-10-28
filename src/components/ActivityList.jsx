export const ActivityList = ({ activities }) => (
  <ul>
    {activities.map((activity, index) => (
      <li key={index} className="py-1 text-gray-800">
        {activity.date}: {activity.activity}
      </li>
    ))}
  </ul>
);


