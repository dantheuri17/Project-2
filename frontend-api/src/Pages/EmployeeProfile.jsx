import React, { useState } from 'react';
import "./EmployeeProfile.css";
import { PlusOutlined } from '@ant-design/icons';
import {
  Form,
  Input,
  Button,
  Select,
  DatePicker,
  InputNumber,
  Switch,
  Upload,
} from 'antd';

const { TextArea } = Input;


const EmployeeProfile = () => {
	const [data, setData] = useState({});
	const [submitted, setSubmitted] = useState(false);

	const serverHost = "http://localhost:4000";

	async function addEmployee(employee) {
		const url = serverHost + "/employees";
		const options = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(employee),
		};
		const response = await fetch(url, options);
		if (response.status === 200) {
			setSubmitted(true);
			console.log("Submitted", submitted)
		}
	}

	const handleChange = (e) => {
		console.log("Value in e", e)
		const name = e.target.name;
		const value = e.target.value;
		//create an object for the current input field event
		const currentInputFieldData = {
			[name]: value,
		};
		const updatedData = {
			...data,
			...currentInputFieldData,
		};
		setData(updatedData);
	};

	const handleSelect = (name, option) => {
		console.log("Value in  name  and option", name,  option)
		
		//create an object for the current input field event
		const currentInputFieldData = {
			[name]: option,
		};
		const updatedData = {
			...data,
			...currentInputFieldData,
		};
		setData(updatedData);
	};



	const handleSubmit = (e) => {
		console.log(data);
		addEmployee(data);
		e.preventDefault();
		
	};

	return (
		<div>
			<div id="contentdiv">
				<Form onSubmit={handleSubmit}>
				<Form.Item name="employeeName" rules={[{ required: true }]}>
				<label>
					Employee Name
					<Input onChange={handleChange}/>
				</label>
				</Form.Item>

				<Form.Item name="email" rules={[{ required: true, type: 'email' }]}>
				<label>
					Email
					<Input onChange={handleChange}/>
				</label>
				</Form.Item>
				<Form.Item name="phoneNumber" rules={[{ required: true}]}>
				<label>
					Phone Number
					<Input onChange={handleChange}/>
				</label>
				</Form.Item>
				<Form.Item name="employeeStatus" rules={[{ required: true}]} >
				<label>
					Employee Status
					<Select name="employeeStatus" onChange={handleChange} >
						<Select.Option value="employed">Employed</Select.Option>
						<Select.Option value="fired">Fired</Select.Option>
						<Select.Option value="resigned">Resigned</Select.Option>
					</Select>
				</label>
			</Form.Item>
			<Form.Item  name="date" rules={[{ required: true}]} >
			<label>
				Date Joined
			<DatePicker onChange={handleChange}/>
			</label>
			</Form.Item>


			<Form.Item>
				<Button type="primary" htmlType="submit">
					Submit
				</Button>
			</Form.Item>	
			</Form>
			</div>
		</div>
	);
};


export default EmployeeProfile