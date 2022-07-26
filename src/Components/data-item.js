import React from 'react';


const DataItem = ({ data, onEdit }) =>
(
<div >
  <table className='table'>
    <thead>
      <tr>
        <th>Id</th>
        <th>Name</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {(
        data.map(data => (
          <tr key={data.id}>
            <td>{data.id}</td>
            <td>{data.name}</td>
            <td>
              <button onClick={() => onEdit(data)}>book here</button>
            </td>
          </tr>
        ))
      )}
    </tbody>
  </table>
  </div>
);


export default DataItem;