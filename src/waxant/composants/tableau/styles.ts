import { Table, Tag } from 'antd';
import styled from 'styled-components';

export const STable = styled(Table) <{ $type: string }>`
    .ant-table-thead {
        .ant-table-cell {
            text-transform: uppercase;
            font-weight: 600;
            font-size: 12px;
            ${({ $type }) => {
        if ($type === 'normal') {
            return 'background-color: #e9e5e0;';
        } else {
            return `
                                        color: #555;
                                        background-color: #ddd;
                                        border-bottom: 2px solid ${(props) => props.theme.token.colorPrimary};
                                `;
        }
    }}
        }
    }

    .ant-table-tbody {
        .ant-table-row {
            cursor: pointer;
            font-weight: 400;
            .visibleSiHover {
                color: transparent;
            }
            .ant-table-cell {
                &.colonneAction {
                    cursor: pointer;
                }
                vertical-align: top;
                &.entier {
                    text-align:right;
                }
                &.decimal {
                    text-align:right;
                }
            }
            &.selectionne {
                .ant-table-cell {
                    background-color: ${(props) => `${props.theme.token.colorPrimary}1A`};
                }
                .visibleSiHover {
                    color: ${(props) => props.theme.token.colorPrimary};
                }
            }
            &:hover {
                .visibleSiHover {
                    color: #333;
                }
                &.selectionne {
                    cursor: default;
                    .ant-table-cell {
                        background-color: transparent;
                    }
                    .visibleSiHover {
                        color: ${(props) => props.theme.token.colorPrimary};
                    }
                }
            }
            &.selectionne {
                color: ${(props) => props.theme.token.colorPrimary};
                font-weight: bold;
                .visibleSiSelectionne {
                    color: ${(props) => props.theme.token.colorPrimary};
                }
            }
        }
    }
`;

export const STag = styled(Tag)`
    background-color: ${(props) => `${props.theme.token.colorPrimary}1D`};
    &:hover {
        background-color: ${(props) => `${props.theme.token.colorPrimary}80`};
    }
`;
