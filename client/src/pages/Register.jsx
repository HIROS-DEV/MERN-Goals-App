import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaUser } from 'react-icons/fa';
import { register, reset } from '../features/auth/authSlice';
import Spinner from '../components/Spinner';

const Register = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		password2: '',
	});
	const { name, email, password, password2 } = formData;

	const { user, isLoading, isError, isSuccess, message } =
		useSelector((state) => state.auth);

	const handleChange = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		if (password !== password2) {
			toast.error('Password do not match');
		} else {
			const userData = {
				name,
				email,
				password,
			};
			dispatch(register(userData));
		}
	};

	useEffect(() => {
		if (isError) {
			toast.error(message);
		}
		if (isSuccess || user) {
			navigate('/');
		}

		dispatch(reset());
	}, [user, isError, isSuccess, message, navigate, dispatch]);

	if (isLoading) {
		return <Spinner />;
	}

	return (
		<>
			<section className='heading'>
				<h1>
					<FaUser /> Register
				</h1>
				<p>Please create an account</p>
			</section>

			<div className='form'>
				<form onSubmit={handleSubmit}>
					<div className='form-group'>
						<input
							type='text'
							className='form-control'
							id='name'
							name='name'
							value={name}
							placeholder='Enter your name'
							onChange={handleChange}
						/>
					</div>
					<div className='form-group'>
						<input
							type='email'
							className='form-control'
							id='email'
							name='email'
							value={email}
							placeholder='Enter your email'
							onChange={handleChange}
						/>
					</div>
					<div className='form-group'>
						<input
							type='password'
							className='form-control'
							id='password'
							name='password'
							value={password}
							placeholder='Enter your password'
							autoComplete='password'
							onChange={handleChange}
						/>
					</div>
					<div className='form-group'>
						<input
							type='password'
							className='form-control'
							id='password2'
							name='password2'
							value={password2}
							placeholder='Enter confirm password'
							autoComplete='password2'
							onChange={handleChange}
						/>
					</div>
					<div className='form-group'>
						<button type='submit' className='btn btn-block'>
							Sugmit
						</button>
					</div>
				</form>
			</div>
		</>
	);
};
export default Register;
