"use client";
import React, { useState } from "react";
import { toast } from "react-toastify";

const page = () => {
	const [title, settitle] = useState("");
	const [description, setdescription] = useState("");
	const [status, setstatus] = useState("due");

	const [tasks, settasks] = useState([]);

	const dets = (e) => {
		e.preventDefault();

		if (title.length < 5 || description.length < 20) {
			console.log(title, title.length);
			toast.error(
				"title and descriprion must be more than 5 and 20 char respectively "
			);
			return;
		}

		const newTask = {
			title,
			description,
			status,
			date: new Date().toLocaleDateString(),
		};

		settasks([...tasks, newTask]);
		settitle("");
		setdescription("");
		setstatus("due");

		console.log(newTask);
		console.log("title", title);
	};

  const DeleteHandler = (index) => {
		settasks(tasks.filter((t, i) => i !== index));
	};

	let tasklist = <h2> Loading....</h2>;
	// console.log(tasklist);
	if (tasks.length > 0) {
		tasklist = tasks.map((task, index) => {
			return (
				<div key={index} className="card  mb-3 me-3" style={{ width: "18rem" }}>
					<div className="card-body">
						<h5 className="card-title">{task.title}</h5>
						<h6 className="card-subtitle mb-2 text-body-secondary">
							{task.status}
						</h6>
						<p className="card-text">{task.description}</p>
						<button className="me-2 btn btn-sm   btn-dark">Update Task</button>
						<button
							onClick={() => DeleteHandler(index)}
							className="btn btn-sm btn-dark"
						>
							Delete Task
						</button>
					</div>
				</div>
			);
		});
	}
	return (
		<div className="mt-5 container p-5">
			<form className="w-50" onSubmit={dets}>
				<h2>Create Your Tasks</h2>
				<input
					className="form-control mb-3"
					type="text"
					placeholder="Title"
					onChange={(e) => settitle(e.target.value)}
				/>
				<textarea
					className="form-control mb-3"
					placeholder="description here..."
					onChange={(e) => setdescription(e.target.value)}
				></textarea>
				<select
					className="form-control mb-3"
					onChange={(e) => setstatus(e.target.value)}
				>
					<option value="due">Due</option>
					<option value="pending">Pending</option>
					<option value="completed">Completed</option>
				</select>
				<button
					type="submit"
					// onClick={(index) => {
					// 	changeHandler;
					// }}
					className="btn btn-primary"
				>
					Create Task
				</button>
				<hr />
			</form>
			<h2>Tasks</h2>

			<div className="d-flex flex-wrap">{tasklist}</div>
		</div>
	);
};

export default page;
