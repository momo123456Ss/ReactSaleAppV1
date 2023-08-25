import { useState ,useRef} from "react"
import { Alert, Button, Form } from "react-bootstrap"
import { useNavigate } from "react-router-dom";
import Apis, { endpoints } from "../configs/Apis";
import MySpinner from "../layout/MySpinner";

const Register = () => {
    const [user, setUser] = useState({
        "username": ""
        ,"password": ""
        ,"firstName": ""
        ,"lastName": ""
        ,"email": ""
        ,"phone": ""
        ,"confirmPass": ""
    })
    const [err, setErr] = useState(null);
    const [loading, setLoading] = useState(false);

    const avatar = useRef();
    const nav = useNavigate();
    const register = (evt ) => {
        setLoading(true);
        evt.preventDefault();
        const process = async () => {
            let form = new FormData();

            for(let field in user){
                if(field !== "confirmPass"){
                    form.append(field,user[field])
                }

            }
            form.append("avatar",avatar.current.files[0]);
            let res = await Apis.post(endpoints['register'],form)
            if(res.status === 201){
                nav("/login")
            }

        }
        if(user.password === user.confirmPass)
            process();
        else{
           setErr("Mat khau ko khop!")
        }
    }
    const chage = (evt, field) => {
        setUser(current => {
            return {...current,[field]: evt.target.value}
            })
    }
    return <>
        <h1>Dang ky nguoi dung</h1>
        {err === null? "" :<Alert variant="danger">{err}</Alert>}
        <Form onSubmit={register}>
            <Form.Group className="mb-3">
                <Form.Label>Tên đăng nhập</Form.Label>
                <Form.Control value={user.username} onChange={(e) => chage(e,"username")} type="text" placeholder="Tên đăng nhập" />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Mật khẩu</Form.Label>
                <Form.Control value={user.password} onChange={(e) => chage(e,"password")} type="password" placeholder="Mật khẩu" />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Xac nhan Mật khẩu</Form.Label>
                <Form.Control value={user.confirmPass} onChange={(e) => chage(e,"confirmPass")} type="password" placeholder="Xac nhan Mật khẩu" />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Ho ten dem</Form.Label>
                <Form.Control value={user.firstName} onChange={(e) => chage(e,"firstName")} type="text" placeholder="Ho ten dem" />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Ten</Form.Label>
                <Form.Control value={user.lastName}onChange={(e) => chage(e,"lastName")} type="text" placeholder="Ten" />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control value={user.email} onChange={(e) => chage(e,"email")} type="text" placeholder="Email" />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Phone</Form.Label>
                <Form.Control value={user.phone} onChange={(e) => chage(e,"phone")} type="phone" placeholder="Phone" />
            </Form.Group>
           
            <Form.Group className="mb-3">
                <Form.Label>Anh</Form.Label>
                <Form.Control type="file" ref={avatar} />
            </Form.Group>
            <Form.Group className="mb-3">
                {loading=== true? <MySpinner/>: <Button variant="info" type="submit">Đăng ky</Button>}
            </Form.Group>
        </Form>
    </>
}
export default Register;