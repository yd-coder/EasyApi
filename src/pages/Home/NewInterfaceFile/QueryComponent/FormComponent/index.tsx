/**
 *  请求参数表单
 *  引用: Params Cookie Header
 */

import React, { useState } from 'react'
import { Input } from 'antd'
import styles from './index.module.scss'

// interface FormComponentProps {
//     index: string
//     value: string
// }

const FormComponent: React.FC = () => {
	const [inputs, setInputs] = useState([''])
    const [typeInputs, setTypeInputs] = useState([''])
    const [exampleInputs, setExampleInputs] = useState([''])
    const [descriptionInputs, setDescriptionInputs] = useState([''])
    

	const addInputChange = (index: number, value: string) => {
		// 更新对应输入框的值
		const newInputs = [...inputs]
		newInputs[index] = value
		setInputs(newInputs)

		// 如果当前输入框有内容且为最后一个输入框，则添加一个新的输入框
		if (value !== '' && index === newInputs.length - 1) {
			setInputs([...newInputs, ''])
		}
	}
    const handleInputChange = (inputName:string, index: number, value: string) => {
		// 更新对应输入框的值
        switch (inputName){
            case "type":
                const newTypeInputs = [...typeInputs]
		        newTypeInputs[index] = value
                setTypeInputs(newTypeInputs);
                break;
            case "example":
                const newExampleInputs = [...exampleInputs]
		        newExampleInputs[index] = value
                setExampleInputs(newExampleInputs);
                break;
            case "description":
                const newDescriptionInputs = [...descriptionInputs]
		        newDescriptionInputs[index] = value
                setDescriptionInputs(newDescriptionInputs);
                break;
            default:
                console.log("错误！")
                break;
        }
		
	}

	return (
		<div>
			<div className={styles['form-componet']}>
				<div className="span-group">
					<div className="span-group-item form-item">参数名</div>
					<div className="span-group-item form-item">类型</div>
					<div className="span-group-item form-item">示例值</div>
					<div className="span-group-item form-item">说明</div>
				</div>
				{inputs.map((input, index) => (
					<div className="input-group">
						<Input
							key={index}
							value={input}
							onChange={(e) => addInputChange(index, e.target.value)}
							placeholder="Basic usage"
							className="form-item"
						/>
						<Input
							key={index}
							value={typeInputs[index]}
							onChange={(e) => handleInputChange("type",index, e.target.value)}
							placeholder="Basic usage"
							className="form-item"
						/>
						<Input
							key={index}
							value={exampleInputs[index]}
							onChange={(e) => handleInputChange("example", index, e.target.value)}
							placeholder="Basic usage"
							className="form-item"
						/>
						<Input
							key={index}
							value={descriptionInputs[index]}
							onChange={(e) => handleInputChange("description", index, e.target.value)}
							placeholder="Basic usage"
							className="form-item"
						/>
					</div>
				))}
			</div>
		</div>
	)
}

export default FormComponent
