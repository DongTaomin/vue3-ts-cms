import { ref } from "vue";
import PageContent from "@/components/page-content";
export function usePageSearch() {
  const pageContentRef = ref<InstanceType<typeof PageContent>>();

  const handleResetClick = () => {
    console.log("重置按钮被点击");
    pageContentRef.value?.getPageData();
  };
  const handleQueryClick = (queryInfo: any) => {
    console.log("搜索按钮被点击");
    pageContentRef.value?.getPageData(queryInfo);
  };

  return [pageContentRef, handleResetClick, handleQueryClick];
}
