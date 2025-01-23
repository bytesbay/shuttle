<template>
  <transition name="modal-fade-scale">
    <app-modal class="portfolio-modal" v-if="$root.modal_portfolio_opened" @close="close">
      <div class="content">
       
        <div class="header">
          <div class="proj-title">
            {{ data.name }}
          </div>
          
          <div class="info">
            <div class="left">
              <div class="type">
                {{ data.type }} / {{ data.year }}
              </div>
              <div class="year">{{ data.date }}</div>
              <a :href="data.link" class="link">
                {{ data.link_label }}
                <svg width="512" height="248" viewBox="0 0 512 248" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M506.134 109.843C506.128 109.837 506.123 109.83 506.116 109.824L401.612 5.82394C393.783 -1.96706 381.12 -1.93807 373.327 5.89193C365.535 13.7209 365.565 26.3839 373.394 34.1759L443.558 104H20C8.954 104 0 112.954 0 124C0 135.046 8.954 144 20 144H443.557L373.395 213.824C365.566 221.616 365.536 234.279 373.328 242.108C381.121 249.939 393.785 249.966 401.613 242.176L506.117 138.176C506.123 138.17 506.128 138.163 506.135 138.157C513.968 130.339 513.943 117.635 506.134 109.843Z"/>
                </svg>
              </a>
            </div>
            <div class="right">
              <div class="title">
                Technologies:
              </div>
              <div class="list">
                <div v-for="(tech, i) in data.techs" class="item">
                  <div class="index">
                    0{{ i + 1 }}
                  </div>
                  |
                  <div class="name">
                    {{ tech }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="desc">
          <!-- {{ data.desc }} -->
          Description: <br> <br>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </div>
      </div>
    </app-modal>
  </transition>
</template>

<script>
export default {
  methods: {

    close() {
      this.$root.modal_portfolio_opened = false;
    },

    
  },

  computed: {

    data() {
      return this.$root.modal_portfolio_proj
    }
  },

  components: {
    
  }
}
</script>

<style lang="scss" scoped>

.portfolio-modal {
  .content {
    display: flex;
    flex-direction: column;
    align-items: stretch;

    width: 100%;
    max-width: 600px;
  }

  .container {
    max-width: 1200px;
    width: 100%;
    margin: 0 auto;

    @media (max-width: 1200px) {
      padding: 20px 0;
    }
  }

  .header {
    display: flex;
    flex-direction: column;

    background: #f5f5f5;
    color: #0e0e0e;
    padding: 30px;

    .proj-title {
      font-weight: 600;
      font-size: 42px;
      line-height: 1;
      padding-bottom: 10px;
    }

    .info {
      display: flex;
      flex-direction: row;
      justify-content: space-between;

      width: 100%;
    }

    .left {

      flex-grow: 1;

      display: flex;
      flex-direction: column;
      align-items: flex-start;
  
      .type {

        display: flex;
        flex-direction: row;
        // align-items: center;

        font-size: 12px;
        font-family: 'Fira Mono';
        // margin-top: 10px;
        color: #717171;
        flex-grow: 1;
      }
  
      .year {
        margin-top: 10px;
      }
      .link {
        margin-top: 10px;
        padding: 10px 20px;
        text-decoration: none;
        background: #FF2A75;
        color: #f5f5f5;
        font-family: 'Fira Mono';
        font-size: 13px;

        display: flex;
        flex-direction: row;
        align-items: center;

        svg {
          margin-left: 15px;
          fill: #f5f5f5;
          height: 8px;
          width: auto;
        }
      }
    }
    
    .right {
      display: flex;
      flex-direction: column;

      font-family: 'Fira Mono';
      font-size: 12px;
      padding-right: 30px;

      .title {
        
      }
      .list {
        padding-top: 10px;
        .item {

          display: flex;
          flex-direction: row;
          align-items: center;

          padding: 5px 0;
          
          .name {
            padding-left: 10px;
          }

          .index {
            color: #717171;
            padding-right: 10px;
          }
        }
      }
    }
  }

  .desc {

    padding-top: 50px;
    font-size: 14px;
    text-align: justify;
    color: #f5f5f5;
    background: #0e0e0e;
    padding: 20px;
    font-family: 'Fira Mono';
    line-height: 1.5;
  }
}

</style>