import React, { useState, useEffect } from "react";
import _ from "lodash";

const pageSize = 4;
function App() {
  const [data, setuserData] = useState([]);
  const [paginated, setPaginated] = useState([]);
  const [currentpage, setCurrentpage] = useState(1);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((json) => {
        setuserData(json);
        setPaginated(_(json).slice(0).take(pageSize).value());
      });
  }, []);

  const handlehead = () => {
    return Object.keys(paginated[0]).map((att) => (
      <th key={att}>{att.toUpperCase()}</th>
    ));
  };

  const userrows = () => {
    return paginated.map((dt) => {
      return (
        <tr key={dt.id}>
          <td>{dt.id}</td>
          <td>{dt.name}</td>
          <td>{dt.username}</td>
          <td>{dt.email}</td>
          <td>
            {`${dt.address.street}, ${dt.address.city},${dt.address.suite},${dt.address.zipcode}`}
          </td>
          <td>{dt.phone}</td>
          <td>{dt.website}</td>
          <td>{dt.company.name}</td>
        </tr>
      );
    });
  };
  //pagination
  const pagecount = data ? Math.ceil(data.length / pageSize) : 0;
  if (pagecount === 1) return null;
  const pages = _.range(1, pagecount + 1);

  const pagination = (pageNO) => {
    setCurrentpage(pageNO);
    const startIndex = (pageNO - 1) * pageSize;
    const paginationdata = _(data).slice(startIndex).take(pageSize).value();
    setPaginated(paginationdata);
  };

  return (
    <div>
      <table className="table">
        <thead>
          {/* <tr style={{ background: "gray" }}> {handlehead()}</tr> */}
          <td>Id</td>
          <td>Name</td>
          <td>UerName</td>
          <td>Email</td>

          <td>Address</td>
          <td>Phone_no</td>
          <td>Website</td>
          <td>Company</td>
        </thead>
        <tbody>{userrows()}</tbody>
      </table>
      <nav className="d-flex justify-content-center">
        <ul
          className="pagination"
          style={{ marginTop: "50px", position: "fixed" }}
        >
          {pages.map((page) => {
            return (
              <li
                className={
                  page === currentpage ? "page-item active" : "page-item"
                }
              >
                <p className="page-link" onClick={() => pagination(page)}>
                  {" "}
                  {page}
                </p>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}

export default App;
