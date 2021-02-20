import "../styled.css";
import { Button } from "./button";
import styled from "styled-components";
import { useState } from "react";
import Select from 'react-select'

const FormButton = styled(Button)`
    width: 150px;
`

const spending = [
    { value: 'foodExpenses ', label: '食費' },
    { value: 'necessary', label: '日用品' },
    { value: 'clothes', label: '衣服' },
    { value: 'beauty ', label: '美容' },
    { value: 'communicationFee ', label: '交際費' },
    { value: 'medicalBills', label: '医療費' },
    { value: 'educationFee ', label: '教育費' },
    { value: 'utilityCosts', label: '光熱費' },
    { value: 'transportation ', label: '交通費' },
    { value: 'communicationCosts ', label: '通信費' },
    { value: 'housingExpenses ', label: '住居費' },
    { value: 'other', label: 'その他' },
  ]

const income = [
    { value: 'salary ', label: '給料' },
    { value: 'pocketMoney ', label: 'お小遣い' },
    { value: 'bonus ', label: '賞与' },
    { value: 'sideline', label: '副業' },
    { value: 'investment ', label: '投資' },
    { value: 'extraordinaryIncome ', label: '臨時収入' },
    { value: 'other', label: 'その他' },
]

const AddItems = () => {
    const [money, setMoney] = useState("");
    const [options, setOptions] = useState([])
    
    const addMoney = (event) => {
        event.preventDefault();
        if(options === spending && money !== "") {
            alert("減ります")
        } else if(options === income && money !== "") {
            const SpendingSum = () => {
                const sum = [0]
                sum.push(parseInt(money, 10))
                console.log(sum)
                // setText("")
                // setMoney("")
            }
            SpendingSum()
        } else if(money === "0" || money === "") {
            alert("金額を入力してください")
        } else {
            alert("支出か収入か選択してください")
        }
    }

    return (
        <div className="addItemContainer">
            <form onSubmit={addMoney}>
                <div className="item">
                    <input type="radio" name="type" value="spending" onChange={() => setOptions(spending)} />支出
                    <input type="radio" name="type" value="income" onChange={() => setOptions(income)} />収入
                </div>
                <div className="item">
                    <Select className="input" name="type" options={options}/>
                </div>
                <div className="item">
                    <label className="right">金額</label>
                    <input className="input" type="text" value={money} placeholder={"金額を入力してください"} 
                        onChange={(e) => setMoney(e.target.value)} 
                    />
                </div>
                <div className="item">
                    <FormButton>追加</FormButton>
                </div>
            </form>
        </div>
    )
}

export default AddItems;