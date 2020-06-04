import { METHODS, METHOD_FOR_CARD, METHOD_FOR_PHONE, METHODS_FOR_INICIS, METHODS_FOR_UPLUS, METHODS_FOR_KCP, METHODS_FOR_MOBILIANS, QUOTAS, QUOTAS_FOR_INICIS_AND_KCP } from "./constants";

export function getMethods(pg) {
  switch (pg) {
    case "html5_inicis":
      return METHODS_FOR_INICIS;
    case "kcp":
      return METHODS_FOR_KCP;
    case "uplus":
      return METHODS_FOR_UPLUS;
    case "kcp_billing":
    case "kakaopay":
    case "kakao":
    case "paypal":
    case "smilepay":
      return METHOD_FOR_CARD;
    case "mobilians":
      return METHODS_FOR_MOBILIANS;
    default:
      return METHODS;
  }
}

export function getQuotas(pg, method) {
  if (method === "card") {
    switch (pg) {
      case "html5_inicis":
      case "kcp":
        return { isQuotaRequired: true, quotas: QUOTAS_FOR_INICIS_AND_KCP };
      default:
        return { isQuotaRequired: true, quotas: QUOTAS };
    }
  }
  return { isQuotaRequired: false, quotas: QUOTAS };
}
