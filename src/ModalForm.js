import React, { Component } from "react";
import { Col, Modal, ModalBody, ModalHeader, Row } from "reactstrap";
import { Field, reduxForm, change, reset } from "redux-form";
import Swal from "sweetalert2";
import DrozoneField from "./fields/DrozoneField";
import { emailValid } from "./fields/Field";
import { textAreaField, renderField, required } from "./fields/Field";

class ModalForm extends Component {
  componentWillReceiveProps(nextProps) {
    const { isEdit, dispatch } = this.props;
    if (isEdit !== nextProps.isEdit) {
      if (nextProps.isEdit)
        for (const data of Object.entries(nextProps.isEdit)) {
          dispatch(change(formName, data[0], data[1]));
        }
    }
  }

  onSubmit = (val) => {
    const { data, setData, dispatch, isEdit } = this.props;
    if (isEdit) {
      setData(val);
      Swal.fire("Success", "Edit data berhasil", "success");
    } else {
      const find = data.find((x) => x.code === val.code);
      if (find) Swal.fire("Error!", "Code harus unix", "error");
      else {
        setData(val);
        Swal.fire("Success", "Insert data berhasil", "success");
      }
    }
    dispatch(reset());
  };

  render() {
    const { handleSubmit, isOpen, toogle, isEdit } = this.props;
    return (
      <Modal isOpen={isOpen}>
        <ModalHeader>Modal title</ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit(this.onSubmit)}>
            <Row>
              <Col lg="12">
                <Field
                  name="code"
                  label="Kode"
                  component={renderField}
                  validate={[required]}
                  disabled={!!isEdit}
                />
                <Field
                  name="name"
                  label="Nama"
                  component={renderField}
                  validate={[required]}
                />
                <Field
                  name="address"
                  label="Alamat"
                  rows={3}
                  component={textAreaField}
                  validate={[required]}
                />
                <Field
                  name="email"
                  label="Email"
                  component={renderField}
                  validate={[required, emailValid]}
                />
                <Field
                  label="Image"
                  name="image"
                  accept="image/*"
                  component={DrozoneField}
                  // onChange={(val) => uploadFileLampiran(val)}
                />
              </Col>
              <Col lg="12" className="my-3">
                <button className="btn btn-primary" type="submit">
                  Submit
                </button>
                <button
                  className="btn btn-secondary mx-2"
                  type="button"
                  onClick={() => {
                    toogle();
                    // dispatch(reset(formName));
                  }}
                >
                  Cancel
                </button>
              </Col>
            </Row>
          </form>
        </ModalBody>
      </Modal>
    );
  }
}

const formName = "formTest";

export default reduxForm({ form: formName })(ModalForm);
