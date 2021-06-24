import React, { Component } from "react";
import { Col, Container, Row, Table } from "reactstrap";
import ModalForm from "./ModalForm";
import Swal from "sweetalert2";
import { data } from "./dummy";

const header = ["No", "Code", "Name", "Email", "Status", "Actions"];
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      dummyData: data,
      isEdit: null,
    };
  }

  _openModal = () => {
    this.setState({
      isOpen: !this.state.isOpen,
      isEdit: null,
    });
  };
  _deletData = (idx) => {
    const { dummyData } = this.state;
    Swal.fire({
      title: "Delete Data",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.value) {
        dummyData.splice(idx, 1);
        this.setState({
          dummyData: [...dummyData],
        });
      }
    });
  };

  render() {
    const { isOpen, dummyData, isEdit } = this.state;
    return (
      <Container>
        <Row>
          <Col lg="12">
            <button
              className="btn btn-primary"
              onClick={() => this._openModal()}
            >
              Add
            </button>
          </Col>
          <Col lg="12">
            <Table>
              <thead>
                <tr>
                  {header.map((x, i) => (
                    <th key={i}>{x}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {dummyData.map((x, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{x.code}</td>
                    <td>{x.name}</td>
                    <td>{x.email}</td>
                    <td>{x.status ? "ACTIVE" : "NON ACTIVE"}</td>
                    <td>
                      <button
                        className="btn"
                        onClick={() =>
                          this.setState({
                            isEdit: x,
                            isOpen: true,
                          })
                        }
                      >
                        <i className="fas fa-pencil-alt"></i>
                      </button>
                      <button
                        className="btn text-danger"
                        onClick={() => this._deletData(i)}
                      >
                        <i className="fas fa-trash-alt"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
        <ModalForm
          isOpen={isOpen}
          toogle={() => this._openModal()}
          data={dummyData}
          setData={(val) => {
            if (isEdit) {
              console.log(val);
              const idx = dummyData.findIndex((x) => x.code === val.code);
              dummyData[idx] = val;
              this.setState({
                dummyData: [...dummyData],
                // isEdit: null,
              });
            } else
              this.setState({
                dummyData: [...dummyData, val],
              });
            this._openModal();
          }}
          isEdit={isEdit}
        />
      </Container>
    );
  }
}

export default App;
