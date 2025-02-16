import DtmRequest from "../../index";

export function getPageListData(url: string, queryInfo: any) {
  return DtmRequest.post({ url: url, data: queryInfo });
}

// 删除
export function deletePageData(url: string) {
  return DtmRequest.delete({ url: url });
}

// 新建
export function createPageData(url: string, newData: any) {
  return DtmRequest.post({ url: url, data: newData });
}

// 编辑
export function editPageData(url: string, editData: any) {
  return DtmRequest.patch({ url: url, data: editData });
}
