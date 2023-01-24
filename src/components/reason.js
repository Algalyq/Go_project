

export default function Reason(props){
      return(
            <div class={props.class}>
                <div class="feature">
                    <div class="icon">
                        <img src={props.img} alt="Image" class="imf-fluid" />
                    </div>
                    <h3>{props.name}</h3>
                    <p>Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate.</p>
                </div>
            </div>
      )
}