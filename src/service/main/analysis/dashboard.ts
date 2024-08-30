import DtmRequest from "@/service";
enum DashboardAPI {
  categoryGoodsCount = "/goods/category/count",
  categoryGoodsSale = "/goods/category/sale",
  categoryGoodsFavor = "/goods/category/favor",
  addressGoodsSale = "/goods/address/sale",
}
export function getCategoryGoodsCount() {
  return DtmRequest.get({ url: DashboardAPI.categoryGoodsCount });
}

export function getCategoryGoodsSale() {
  return DtmRequest.get({ url: DashboardAPI.categoryGoodsSale });
}

export function getCategoryGoodsFavor() {
  return DtmRequest.get({ url: DashboardAPI.categoryGoodsFavor });
}

export function getAddressGoodsSale() {
  return DtmRequest.get({ url: DashboardAPI.addressGoodsSale });
}
