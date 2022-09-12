import React from 'react';
import PropTypes from 'prop-types';
import update from 'immutability-helper';
import {HTML5Backend} from 'react-dnd-html5-backend';
import {DndProvider, useDrag, useDrop} from 'react-dnd';
import {Button, Space, Table, Tag, Popconfirm} from 'antd';

// eslint-disable-next-line react/prop-types
const DraggableBodyRow = ({index, moveRow, className, style, ...restProps}) => {
  const ref = React.useRef(null);
  const [{isOver, dropClassName}, drop ] = useDrop({
    accept: 'DraggableBodyRow',
    collect: (monitor) => {
      const {index: dragIndex} = monitor.getItem() || {};
      return dragIndex === index ? {} : {
        isOver: monitor.isOver(),
        dropClassName: dragIndex < index ? ' drop-over-downward' : ' drop-over-upward'
      };
    },
    drop: (item) => moveRow(item.index, index)
  });
  const [ , drag ] = useDrag({
    type: 'DraggableBodyRow',
    item: {index},
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  });
  drop(drag(ref));
  return (
    <tr
      ref={ref}
      className={`${className}${isOver ? dropClassName : ''}`}
      style={{cursor: 'move', ...style}}
      {...restProps}
    />
  );
};

export default class MainTable extends React.Component {
  constructor(props) {
    super(props);
  }

  static get propTypes() {
    return {
      id: PropTypes.string,
      items: PropTypes.array,
      onItemDrag: PropTypes.func,
      onItemDelete: PropTypes.func
    };
  }

  columns = [
    {
      title: '课程名称',
      dataIndex: 'name',
      key: 'name',
      sorter: (l, r) => l.name < r.name ? -1 : l.name > r.name ? 1 : 0,
      ellipsis: true,
      width: 160
    },
    {
      title: '课程成绩',
      dataIndex: 'score',
      key: 'score',
      sorter: (l, r) => l.score - r.score,
      width: 110
    },
    {
      title: '课程学分',
      dataIndex: 'credits',
      key: 'credits',
      sorter: (l, r) => l.credits - r.credits,
      width: 110
    },
    {
      title: '课程类型',
      dataIndex: 'optional',
      key: 'optional',
      render: (_, item) => (
        <Space>
          <Tag color={item.optional ? 'geekblue' : 'green'}>
            {item.optional ? '一般专业' : '非一般专业'}
          </Tag>
          {item.selected &&
          <Tag color={'orange'}>
            {'计入'}
          </Tag>
          }
        </Space>
      ),
      sorter: (l, r) => r.optional - l.optional,
      width: 150
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) =>
        this.props.items.length > 0 ? (
          <Popconfirm
            title='确定删除？'
            okText={'确定'}
            cancelText={'取消'}
            onConfirm={() => this.props.onItemDelete(record.key)}
          >
            <Button danger>删除</Button>
          </Popconfirm>
        ) : null,
      align: 'center',
      width: 80
    }
  ];

  render() {
    return (
      <DndProvider backend={HTML5Backend}>
        <Table
          id={this.props.id}
          columns={this.columns}
          dataSource={this.props.items.map((i) => {
            return {...i, key: i.name};
          })}
          size={'middle'}
          pagination={false}
          style={{marginTop: '25px'}}
          components={{body: {row: DraggableBodyRow}}}
          onRow={(record, index) => ({
            index,
            moveRow: (dragIndex, hoverIndex) => {
              const dragRow = this.props.items[dragIndex];
              this.props.onItemDrag(update(this.props.items, {
                $splice: [[ dragIndex, 1 ], [ hoverIndex, 0, dragRow ]]
              }));
            }
          })}
        />
      </DndProvider>
    );
  }
}
