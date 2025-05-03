
import { Link } from 'react-router-dom';

export default function ManufacturerCard({ manufacturer }) {
  if (!manufacturer) return null;

  // console.log('Manufacturer ID:', manufacturer.id);
  return (
    <Link
      to={`/manufacturer/${manufacturer.id}`}
      className="group block bg-white rounded-2xl p-5 shadow-md hover:shadow-lg hover:-translate-y-1 transform transition duration-300 border border-gray-100"
    >
      <article className="flex flex-col gap-2">
        <header className="flex justify-between items-center">
          <h3 className="text-lg font-bold text-gray-800 group-hover:text-blue-600 truncate">
            {manufacturer.name || 'Unnamed'}
          </h3>
          <span className="inline-block text-xs bg-blue-100 text-blue-600 font-medium px-2 py-0.5 rounded-full">
            {manufacturer.category || 'Unknown'}
          </span>
        </header>
        <div className="text-sm text-gray-500">
          <p className="truncate">📍 {manufacturer.city || 'N/A'}</p>
        </div>
      </article>
    </Link>
  );
}
