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
                    <div class="skills hide-scrollbar">
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
                <div class="single-freelancer" v-for="user in users" :key="user.id">
                    <div class="personal-details">

                        <div class="profile-picture">
                            <img :src="user.avatar" @error="imageLoadError(user)" alt="profile pic" class="profile">
                            <a href="mailto:accounts@123workforce.com" class="message-icon">
                                <img src="/assets/icons/homepage/message-icon.png" alt="message">
                            </a>
                        </div>

                        <div class="professional-details">
                            <div class="name-wrapper">
                                <div class="name">
                                    {{ user.name }}
                                </div>
                                <div class="job-title">
                                    {{ user.job_title }}
                                </div>
                            </div>

                            <div class="skills hide-scrollbar">
                                <div class="single-skill" v-for="skill in user.skills" :key="skill.id">
                                    {{ skill.title }}
                                </div>
                            </div>
                        </div>

                        <div class="hire-button-wrapper">
                            <div class="hire-button">
                                <a :href="user.url" target="_blank">
                                    Hire me
                                </a>
                            </div>
                        </div>
                    </div>

                    <Waypoint @change="onChange" :options="{threshold: [0.90, 0.90]}">
                        <div class="video-wrapper">
                                <video v-if="user.about_video !== null" @error="videoLoadError(user)"
                                       :id="`userVideo_${user.id}`" controls>
                                    <source :src="user.about_video" type="video/mp4">
                                    Your browser does not support the video tag.
                                </video>
                            <img v-else src="/assets/icons/homepage/video-coming-soon.png" alt="coming soon" class="soon">
                        </div>
                    </Waypoint>

                </div>
                <div class="single-freelancer-skeleton" v-if="isPending">
                    <div class="avatar-skeleton"></div>
                    <div class="info-skeleton-one"></div>
                    <div class="info-skeleton-two"></div>
                    <div class="video-skeleton"></div>
                </div>
            </div>
        </div>


        <div class="footer" id="footer">
            <a href="/" class="footer-logo"></a>

            <div class="social-follow">
                <a href="https://www.facebook.com/123workforce" class="single-social">
                    <img src="/assets/icons/homepage/social/facebook-icon.png" alt="facebook">
                </a>.
                <a href="https://www.instagram.com/123workforce" class="single-social">
                    <img src="/assets/icons/homepage/social/instagram-icon.png" alt="instagram">
                </a>
            </div>

            <div class="contact-icons">
                <a href="https:/wa.me/353868447832" class="single-contact">
                    <img src="/assets/icons/homepage/social/whatsapp-icon.png" alt="whatsapp">
                </a>
                <a href="skype:magictime.uk?chat" class="single-contact">
                    <img src="/assets/icons/homepage/social/skype-icon.png" alt="skype">
                </a>
                <a href="mailto:accounts@123workforce.com" class="single-contact">
                    <img src="/assets/icons/homepage/social/email-icon.png" alt="email">
                </a>
                <a href="https:/t.me/conormarjoram" class="single-contact">
                    <img src="/assets/icons/homepage/social/telegram-icon.png" alt="telegram">
                </a>
            </div>

        </div>

    </div>
</template>


<script>
    import {Head, Link} from '@inertiajs/inertia-vue3';
    import {Waypoint} from 'vue-waypoint'

    export default {
        components: {
            Head, Link, Waypoint
        },
        props: {
            canLogin: Boolean,
            canRegister: Boolean,
        },
        data() {
            return {
                users: [],
                page: 1,
                count: 5,
                lastPage: 100,
                currentVisibleVideo: null,
                isPending: false
            }
        },
        methods: {
            getHomeProfiles() {
                if(this.isPending){
                   return;
                }

                this.isPending = true;
                axios.get(`${process.env.MIX_CIV_URL}/api/search/workforce-profiles?page=${this.page}&count=${this.count}`)
                    .then((res) => {
                        this.users.push(...res.data.data);
                        this.lastPage = res.data.last_page;
                        this.page++;
                        this.isPending = false;
                    })
                    .catch((err) => {
                        this.isPending = false;
                    });
            },
            imageLoadError(user) {
                user.avatar = '/assets/icons/homepage/profile-pic-holder.png';
            },
            videoLoadError(user) {
                console.log(`User ${user.name} has a broken about video`);
            },
            onChange(waypointState) {
                if(waypointState.going === 'IN'){
                    this.playVisibleVideo(waypointState.el.querySelector('.video-wrapper video'));
                }
            },
            playVisibleVideo(videoElement){
                document.querySelectorAll('video').forEach(vid => vid.pause());
                videoElement?.play();
            }
        },
        mounted() {
            this.getHomeProfiles();

            window.addEventListener('scroll', () => {
                const {scrollTop, scrollHeight, clientHeight} = document.documentElement;

                if (scrollTop + clientHeight >= scrollHeight - 5 && this.page <= this.lastPage){
                    this.getHomeProfiles();
                }
            }, {
                passive: true
            });
        }
    }

</script>
