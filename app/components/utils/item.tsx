
class Animations {

    static leftToRight({ duration, delay, inverse, distance }: {
        duration: number, delay?: number, inverse?: boolean, distance?: number
    }) {
        const safe_distance = distance ?? 90;
        return ({
            hidden: { opacity: 0, x: inverse == true ? safe_distance : -safe_distance, },
            show: {

                opacity: 1,
                x: 0,
                scale: 1,
                transition: {
                    duration: duration,
                    delay: delay ?? .2
                },
            },
        });
    };

    static bottomToTop({ duration, inverse, delay, distance }: { duration: number, inverse?: boolean, delay?: number, distance?: number }) {
        const safe_distance = distance ?? 90;
        return ({
            hidden: { opacity: 0, y: inverse == true ? -safe_distance : safe_distance, },
            show: {

                opacity: 1,
                y: 0,
                scale: 1,
                transition: {
                    duration: duration,
                    delay: delay ?? .2
                },
            },
        });
    };
    static opacity({ duration, delay }: { duration: number, delay?: number, }) {

        return ({
            hidden: { opacity: 0, },
            show: {

                opacity: 1,
                y: 0,
                scale: 1,
                transition: {
                    duration: duration,
                    delay: delay ?? .2
                },
            },
        });
    };

    static scale({ duration, delay, inverse }: { duration: number, delay?: number, inverse?: boolean }) {
        const safe_inverse = inverse ?? false;
        return ({
            hidden: { opacity: 0, scale: safe_inverse ? 2 : 0, },
            show: {

                opacity: 1,
                y: 0,
                scale: 1,
                transition: {
                    duration: duration,
                    delay: delay ?? .2
                },
            },
        });
    };

}



export default Animations; 
