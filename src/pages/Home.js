import React, { useEffect, useState } from 'react';

function HomePage() {
  const [resources, setResources] = useState([]);

  const getdata = async () => {
    const data = await fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json());
    setResources(data);
    console.warn(data);
  }

  useEffect(() => {
    getdata();
  }, []);

  let count = 0;
  const addData = async () => {
    count = count + 1;
    await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify({
        title: 'foo',
        body: 'bar',
        userId: count,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
  }

  const updateData = async (id) => {
    await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        title: 'foo',
        body: 'bar',
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
  }

  const deleteData = async (id) => {
    await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: 'DELETE',
    })
      .then(console.log("Successfully deleted"));
  }
  return (
    <div>
      <h2 className='text-center font-extrabold text-5xl my-5'>Resource List</h2>
      <button className=' ml-8 px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800' onClick={() => { addData() }} >Add Data</button>
      <ul className='w-full rounded-lg mt-2 mb-3 text-blue-800 ml-8'>
        {
          resources.map((resource) => (
            <li className='text-xl text-gray-900 dark:text-white my-5 w-10/12 p-2 rounded mb-1 bg-stone-100' key={resource.id}>{resource.id}{". "}{resource.title} <br />
              <button className='text-base m-2 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded' onClick={() => { updateData(resource.id) }}>Update</button>
              <button className='text-base m-2 bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded' onClick={() => { deleteData(resource.id) }}>Delete</button>
            </li>
          ))
        }
      </ul>
      {/* Implement UI for adding, editing, and deleting resources */}
    </div>
  );
}

export default HomePage;
