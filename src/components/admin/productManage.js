import { AiOutlineUpload } from "react-icons/ai";
import React, { useEffect, useState } from 'react';
import CommonUtils from '../../utils/CommonUtils';
import { useOutletContext } from 'react-router-dom';
import { alert } from 'react-bootstrap-confirmation';
import './productManage.scss'
import { getAllUCodeService } from "../../services/userService";
const ProductManage = (props) => {
    const outletContext = useOutletContext()
    const [nameItem, setNameItem] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');
    const [type, setType] = useState('');
    const [manufacturer, setManufacturer] = useState('');
    const [ram, setRam] = useState('');
    const [rom, setRom] = useState('');
    const [color, setColor] = useState('');
    const [image, setImage] = useState('');

    const [selectType, setSelectType] = useState([]);
    const [selectPloai, setSelectPloai] = useState([]);
    const [selectColor, setSelectColor] = useState([]);
    useEffect(() => {
        const fetch = async (e) => {
            const resType = await getAllUCodeService('TYPEPHONE');
            const resPloai = await getAllUCodeService('PLOAI');
            const resColor = await getAllUCodeService('COLOR');

            if (resType && resType.errCode === 0 &&
                resPloai && resPloai.errCode === 0 &&
                resColor && resColor.errCode === 0
            ) {
                setSelectType(resType.data)
                setSelectPloai(resPloai.data)
                setSelectColor(resColor.data)
                console.log(resType,
                    resPloai,
                    resColor);
            } else {
            }

        };
        fetch()
    }, []);


    const checkValiDateInput = () => {
        // let isValid = true
        // const object = { email, password, name, address, gender, phoneNumber, roleId, image };
        // const arrInput = ['email', 'password', 'name', 'address', 'gender', 'phoneNumber', 'roleId', 'image']
        // for (let i = 0; i < arrInput.length; i++) {
        //     if (!object[arrInput[i]]) {
        //         alert('B???n ???? nh???p thi???u ' + arrInput[i]);
        //         isValid = false
        //         break;
        //     }
        // }
        // return isValid;
    }
    const handleOnClickSubmit = async (e) => {
        // const isValid = checkValiDateInput();
        const typeData = 'CREATE-PRODUCT';
        outletContext.createToAdmin({
            nameItem, price, type, manufacturer, ram, rom, color, quantity, image: image.avatar
        }, typeData)
        console.log(nameItem, price, type, manufacturer, ram, rom, color, quantity, image)

    };
    const handleOnchangeImg = async (e) => {
        const data = e.target.files;
        const file = data[0];
        if (file) {
            const b64 = await CommonUtils.getBase64(file);
            const objectUrl = URL.createObjectURL(file);
            console.log('b64', b64);
            setImage({
                previewImg: objectUrl,
                avatar: b64
            })

        }
    }
    return (
        <div className="product-manage">
            {console.log(selectType,
                selectPloai,
                selectColor)}
            <h4 className="mt-3">S???n ph???m</h4>
            <hr />
            <div className="row">
                <div className="manage__content-form form-group col-6">
                    <label>T??n s???n ph???m</label>
                    <input
                        onChange={(e) => setNameItem(e.target.value)}
                        type="text" className="form-control" />
                </div>
                <div className="manage__content-form form-group col-6">
                    <label>Gi??</label>
                    <input
                        onChange={(e) => setPrice(e.target.value)}
                        type="text" className="form-control" />
                </div>
            </div>
            <div className="row ">
                <div className="manage__content-form form-group col-6">
                    <label className="manage__content-label">H??ng s???n xu???t</label>

                    <select
                        onChange={(e) => setManufacturer(e.target.value)}
                        className="form-select">
                        <option value="Iphone">Iphone</option>
                        <option value="Samsung">Samsung</option>
                        <option value="Xiaomi">Xiaomi</option>
                    </select>
                </div>

                <div className="manage__content-form form-group col-6">
                    <label className="manage__content-label">Lo???i s???n ph???m</label>
                    <select
                        onChange={(e) => setType(e.target.value)}
                        className="form-select">
                        <option value="PHONE">??i???n tho???i </option>
                        <option value="PHUKIEN">Ph??? ki???n</option>
                    </select>
                </div>

            </div>
            <div className="row">

                <div className="manage__content-form form-group col-6">
                    <label className="manage__content-label">Ram</label>
                    <select
                        onChange={(e) => setRam(e.target.value)}
                        className="form-select">
                        <option value="4GB">4GB</option>
                        <option value="8GB">8GB</option>
                        <option value="12GB">12GB</option>
                    </select>
                </div>
                <div className="manage__content-form form-group col-6">
                    <label className="manage__content-label">B??? nh???</label>
                    <select
                        onChange={(e) => setRom(e.target.value)}
                        className="form-select">
                        <option value="16GB">16GB</option>
                        <option value="32GB">32GB</option>
                        <option value="64GB">64GB</option>
                        <option value="128GB">128GB</option>
                        <option value="256GB">256GB</option>
                        <option value="512GB">512GB</option>

                    </select>
                </div>
            </div>
            <div className="row">
                <div className="manage__content-form form-group col-6">
                    <label className="manage__content-label">M??u s???c</label>
                    <select
                        onChange={(e) => setColor(e.target.value)}
                        className="form-select">
                        <option value="??en">??en</option>
                        <option value="Tr???ng">Tr???ng</option>
                        <option value="?????">?????</option>
                        <option value="Xanh">Xanh l??</option>

                    </select>
                </div>
            </div>
            <div className='row'>
                <div className="manage__content-form col-6">
                    <label className="manage__content-label">???nh s???n ph???m</label>
                    <input
                        id="preview" hidden className="form-control-file" type='file'
                        onChange={(e) => handleOnchangeImg(e)}
                    />
                    <label className="label-upload" htmlFor="preview"><AiOutlineUpload className="form-control-icon" /></label>
                    <div className="preview"
                        style={{
                            backgroundImage: `url(${image.previewImg})`,
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat'
                        }}
                        onClick={() => this.isOpenPreviewImage()}
                    ></div>
                </div>
                <div className="manage__content-form form-group col-6">
                    <label className="manage__content-label">S??? l?????ng s???n ph???m</label>
                    <input
                        onChange={(e) => setQuantity(e.target.value)}
                        type="number" id="quantity" name="quantity" min="1" max="5" />
                </div>
            </div>
            <h4>???nh chi ti???t</h4>
            <hr />
            <div className='row'>
                <div className="manage__content-form col-6">
                    <label className="manage__content-label">???nh chi ti???t s???n ph???m</label>
                    <input
                        id="preview" hidden className="form-control-file" type='file'
                        onChange={(e) => handleOnchangeImg(e)}
                    />
                    <label className="label-upload" htmlFor="preview"><AiOutlineUpload className="form-control-icon" /></label>
                    <div className="preview"
                        style={{
                            backgroundImage: `url(${image.previewImg})`,
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat'
                        }}
                        onClick={() => this.isOpenPreviewImage()}
                    ></div>
                </div>
            </div>



            <h4>Khuy???n m??i</h4>
            <hr />
            <div className="row">

            </div>
            <div className="manage__content-form form-group">
                <label>Khuy???n m??i</label>
                <input
                    onChange={(e) => setQuantity(e.target.value)}
                    type="text" className="form-control" />
            </div>
            <h4>B??i ????ng s???n ph???m</h4>
            <hr />
            <div className="manage__content-form form-group">
                <label>B??i vi???t s???n ph???m</label>
                <input
                    onChange={(e) => setQuantity(e.target.value)}
                    type="text" className="form-control" />
            </div>


            <div className="manage__content-form form-group">
                <label>Th??ng s??? chi ti???t</label>
                <input
                    onChange={(e) => setQuantity(e.target.value)}
                    type="text" className="form-control" />
            </div>

            <button
                onClick={handleOnClickSubmit}
                className="btn btn-primary">T???o s???n ph???m</button>
        </div>
    );
}

export default ProductManage;