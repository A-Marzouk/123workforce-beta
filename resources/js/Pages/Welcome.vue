<template>
    <div class="homepage-wrapper">
        <div class="header">
            <div class="logo">
                <img src="/assets/icons/homepage/logo.png" alt="logo">
            </div>

            <div class="auth">
                <div v-if="canLogin">
                    <Link v-if="$page.props.auth.user" :href="route('dashboard')">
                        Dashboard
                    </Link>

                    <template v-else>
                        <Link :href="route('login')" class="auth-btn">
                            Log in
                        </Link>
                    </template>
                </div>
            </div>
        </div>

        <div class="search-bar-wrapper">
            <div class="search-bar">
                <div class="input-wrapper">
                    <img src="/assets/icons/homepage/search-grey-icon.png" alt="search" class="search-icon">
                    <input type="text" placeholder="Search tech skills">
                </div>

                <div class="skills-suggestions">
                    <div class="skills">
                        <div class="single-skill">
                            Illustration
                        </div>
                        <div class="single-skill">
                            Graphic Design
                        </div>
                        <div class="single-skill">
                            Motion
                        </div>
                        <div class="single-skill">
                            Product
                        </div>
                    </div>
                </div>
            </div>

            <div class="search-btn">
                <img src="/assets/icons/homepage/search.png" alt="search icon">
            </div>
        </div>

        <div class="freelancers-list-wrapper">
            <div class="freelancers-list">
                <div class="single-freelancer">
                    <div class="personal-details">

                        <div class="profile-picture">
                            <img src="/assets/icons/homepage/profile-pic-holder.png" alt="profile pic" class="profile">
                            <div class="message-icon">
                                <img src="/assets/icons/homepage/message-icon.png" alt="message" >
                            </div>
                        </div>

                        <div class="professional-details">
                            <div class="name-wrapper">
                                <div class="name">
                                    Jhone -
                                </div>
                                <div class="job-title">
                                     UI designer
                                </div>
                            </div>

                            <div class="skills">
                                <div class="single-skill">
                                    UI
                                </div>
                                <div class="single-skill">
                                    Web
                                </div>
                                <div class="single-skill">
                                    Motion
                                </div>
                            </div>
                        </div>

                        <div class="hire-button-wrapper">
                            <div class="hire-button">
                                <a href="#">
                                    Hire me
                                </a>
                            </div>
                        </div>

                    </div>
                    <div class="video-wrapper">
                        <img src="/assets/icons/homepage/video-coming-soon.png" alt="coming soon" class="soon">
                    </div>
                </div>
                <div class="single-freelancer">
                    <div class="personal-details">

                        <div class="profile-picture">
                            <img src="/assets/icons/homepage/profile-pic-holder.png" alt="profile pic" class="profile">
                            <div class="message-icon">
                                <img src="/assets/icons/homepage/message-icon.png" alt="message" >
                            </div>
                        </div>

                        <div class="professional-details">
                            <div class="name-wrapper">
                                <div class="name">
                                    Jhone -
                                </div>
                                <div class="job-title">
                                    UI designer
                                </div>
                            </div>

                            <div class="skills">
                                <div class="single-skill">
                                    UI
                                </div>
                                <div class="single-skill">
                                    Web
                                </div>
                                <div class="single-skill">
                                    Motion
                                </div>
                            </div>
                        </div>

                        <div class="hire-button-wrapper">
                            <div class="hire-button">
                                <a href="#">
                                    Hire me
                                </a>
                            </div>
                        </div>

                    </div>
                    <div class="video-wrapper">
                        <img src="/assets/icons/homepage/video-coming-soon.png" alt="coming soon" class="soon">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
    import { Head, Link } from '@inertiajs/inertia-vue3';

    export default {
        components:{
            Head, Link
        },
        props:{
            canLogin: Boolean,
            canRegister: Boolean,
        },
        data(){
          return{
              users: [],
              page: 1,
              count: 5
          }
        },
        methods:{
            getHomeProfiles(){
                axios.get( `${process.env.MIX_CIV_URL}/api/search/workforce-profiles?page=${this.page}&count=${this.count}`)
                    .then( (res) => {
                        this.users = res.data.data;
                    })
                    .catch( (err) => {
                        console.log('Error while fetching users...');
                    });
            }
        },
        mounted(){
            this.getHomeProfiles();
        }
    }

</script>
