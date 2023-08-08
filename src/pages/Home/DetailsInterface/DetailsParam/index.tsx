import { Card, Typography, Tag, Space } from 'antd';
import { Category, Param } from '../interfaceDef';
const { Title } = Typography;

// 后端返回的数据
interface Props {
	paramCategoriesProps: Category[];
}

interface CategoryProps {
    props: Category;
}

interface ParamProps {
    props: Param;
}

const DetailsParam: React.FC<Props> = ({ paramCategoriesProps }) => {
    return (
        <>
            <Title level={5}>请求参数</Title>
            <Space direction='vertical' style={{width: "100%"}}>
                {paramCategoriesProps.map(category => <CategoryDetail key={category.id} props={category} />)}
            </Space>
        </>
    );
}

// 按单个类别遍历，例如Query参数
const CategoryDetail: React.FC<CategoryProps> = ({ props }) => {
    const { name, params } = props;
    return (
        <Card title={name + "参数"} size='small'>
            <Space direction='vertical'>
                {params.map(param => <ParamDetail key={param.id} props={param} />)}
            </Space>
        </Card>
    );
};

// 单个参数
const ParamDetail: React.FC<ParamProps> = ({ props }) => {
    const { name, type, desc, isRequired, exampleValue } = props;
    return (
        <Space direction='vertical'>
            <div>
                <Tag color="blue">{name}</Tag>
                <Space>
                    <span className='colorTwo'>{type}</span>
                    <span className='colorOne'>{desc}</span>
                    {isRequired == "true" ?
                    <Tag color="warning">必需</Tag> :
                    <Tag color="default">可选</Tag>
                    }
                </Space>
            </div>
            <Space>
                <span className='colorOne'>示例值:</span>
                <Tag color="default">{exampleValue}</Tag>
            </Space>
        </Space>
    );
};

export default DetailsParam
