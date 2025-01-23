<template>
  <div id="scroll_elem" class="index" :class="{ mobile: $is_mobile }">

    <div class="scroller"></div>

    <SpaceCanvas @load="loading = false"/>

    <StepScroller/>
    <ScrollTip/>
    <MenuWrapper/>
    <MainHeader/>
    <ContactModal />
    <PortfolioModal />
    <LoadingOverlay :loading="loading"/>
  </div>
</template>

<script>
import SpaceCanvas from '@/components/space-canvas/SpaceCanvas';
import LoadingOverlay from '@/components/LoadingOverlay';
import MainHeader from '@/components/MainHeader';
import ContactModal from '@/components/modals/ContactModal';
import PortfolioModal from '@/components/modals/PortfolioModal';
import MenuWrapper from '@/components/MenuWrapper';
import ProjectsSidebar from '@/components/ProjectsSidebar';
import ScrollTip from '@/components/ScrollTip';
import StepScroller from '@/components/StepScroller';
export default {
  data() {
    return {
      loading: true,
    }
  },
  methods: {

  },
  components: {
    SpaceCanvas,
    LoadingOverlay,
    MainHeader,
    ProjectsSidebar,
    ScrollTip,
    MenuWrapper,
    ContactModal,
    StepScroller,
    PortfolioModal,
  },
}
</script>

<style lang="scss" scoped>

.index {
  overflow-y: scroll;
  height: 100%;
  width: 100%;

  .scroller {
    height: 10000px;
    width: 100%;

  }
}

</style>